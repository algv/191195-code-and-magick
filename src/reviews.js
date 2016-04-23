'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var reviewsSection = document.querySelector('.reviews');
  var moreReviews = reviewsSection.querySelector('.reviews-controls-more');
  var elementToClone;

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  /** @constant {number} */
  var REVIEW_LOAD_TIMEOUT = 10000;

  /** @constant {string} */
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  /*
  * Reviews on page
  * @constant {number}
  */
  var PAGE_SIZE = 3;

  /*
  * Number curent page
  * @type {number}
  */
  var pageNumber = 0;

  /** @type {Array.<Object>} */
  var reviews = [];

  /** @type {Array.<Object>} */
  var filteredReviews = [];

  /** @enum {number} */
  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  /** @constant {Filter} */
  var DEFAULT_FILTER = Filter.ALL;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  /**
   * Add invisible if  flag === false and delete for flag === true
   * @param  {Element} field
   * @param  {Bool} flag
   */
  function toggleVisibility(field, flag) {
    field.classList[flag ? 'remove' : 'add']('invisible');
  }

  /**
   * @param  {Object} reviewData
   */
  function createReviewElement(reviewData) {
    var reviewCloned = elementToClone.cloneNode(true);
    var reviewImage = reviewCloned.querySelector('.review-author');

    var rating = reviewCloned.querySelector('.review-rating');
    var ratingClasses = ['review-rating', 'review-rating-two', 'review-rating-three',
                         'review-rating-four', 'review-rating-five'];

    if(reviewData.rating >= 2) {
      rating.classList.add(ratingClasses[reviewData.rating - 1]);
    }

    reviewCloned.querySelector('.review-text').textContent = reviewData.description;
    reviewImage.title = reviewData.author.name;
    reviewImage.alt = reviewData.author.name;

    var avatarLoadTimeout;
    var avatarReviewer = new Image(124, 124);

    avatarReviewer.onload = function(evt) {
      clearTimeout(avatarLoadTimeout);

      reviewImage.src = evt.target.src;
    };

    avatarReviewer.onerror = function() {
      reviewCloned.classList.add('review-load-failure');
    };

    avatarReviewer.src = reviewData.author.picture;

    avatarLoadTimeout = setTimeout(function() {
      reviewImage.src = '';
      reviewCloned.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    reviewsList.appendChild(reviewCloned);
  }

  /** @param {function(Array.<Object>)} callback */
  function getReviews(callback) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = REVIEW_LOAD_TIMEOUT;

    reviewsSection.classList.add('reviews-list-loading');

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      reviewsSection.classList.remove('reviews-list-loading');
      callback(loadedData);
    };

    xhr.onerror = function() {
      reviewsSection.classList.add('reviews-load-failure');
    };

    xhr.ontimeout = function() {
      reviewsSection.classList.add('reviews-load-failure');
    };


    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.send();
  }

  /**
   * @param  {Array.<Object>} data
   * @param  {number} page
   * @param  {boolean} replace
   */
  function renderReviews(data, page, replace) {
    if(replace) {
      reviewsList.innerHTML = '';
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    data.slice(from, to).forEach(function(review) {
      createReviewElement(review);
    });

    if (isNextPageAvailable(data, pageNumber, PAGE_SIZE)) {
      toggleVisibility(moreReviews, true);
    }
  }

  function renderNextPages() {
    if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
      toggleVisibility(moreReviews, true);
    } else {
      toggleVisibility(moreReviews, false);
    }
  }

  /**
   * @param  {Array.<Object>} data
   * @param  {string} filter
   */
  function getFilteredReviews(data, filter) {
    var reviewsToFilter = data.slice(0);

    var currentDate = new Date();
    var outsideDate = currentDate.setDate(currentDate.getDate() - 14);

    switch (filter) {
      case Filter.ALL:
        break;

      case Filter.RECENT:
        reviewsToFilter.sort(function(current, next) {
          return new Date(current.date) - new Date(next.date);
        });

        return reviewsToFilter.filter(function(review) {
          return new Date(review.date) > outsideDate;
        });

      case Filter.GOOD:
        var goodReviews = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        });
        return goodReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });

      case Filter.BAD:
        var badReviews = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        });
        return badReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });

      case Filter.POPULAR:
        return reviewsToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
    }

    return reviewsToFilter;
  }

  /** @param {string} filter */
  function setFilter(filter) {
    filteredReviews = getFilteredReviews(reviews, filter);
    pageNumber = 0;
    renderReviews(filteredReviews, pageNumber, true);
  }

  function setFiltrationEnabled() {
    reviewsFilter.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('reviews-filter-item')) {
        setFilter(evt.target.getAttribute('for'));
      }
    });
  }

  /**
 * @param {Array} reviews
 * @param {number} page
 * @param {number} pageSize
 * @return {boolean}
 */
  function isNextPageAvailable(reviewsToCheck, page, pageSize) {
    return page < Math.floor(reviewsToCheck.length / pageSize);
  }

  toggleVisibility(reviewsFilter, false);
  toggleVisibility(reviewsSection, false);

  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltrationEnabled();
    setFilter(DEFAULT_FILTER);
    moreReviews.addEventListener('click', renderNextPages);

    toggleVisibility(reviewsFilter, true);
    toggleVisibility(reviewsSection, true);
  });
})();
