'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('template');
  var elementToClone;

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

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

  toggleVisibility(reviewsFilter, false);

  /**
   * @param  {Object} reviewData
   */
  function createReviewElement(reviewData) {
    var reviewCloned = elementToClone.cloneNode(true);
    var reviewImage = reviewCloned.querySelector('.review-author');

    reviewCloned.querySelector('.review-text').textContent = reviewData.description;
    reviewImage.title = reviewData.author.name;
    reviewImage.alt = reviewData.author.name;

    var avatarLoadTimeout;
    var avatarReviewer = new Image();

    avatarReviewer.onload = function(evt) {
      clearTimeout(avatarLoadTimeout);

      reviewImage.src = evt.target.src;
      reviewImage.width = 124;
      reviewImage.height = 124;
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

  window.reviews.forEach(function(review) {
    createReviewElement(review);
  });

  toggleVisibility(reviewsFilter, true);
})();
