'use strict';

 /** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/**
 * @param  {Object} reviewData
 * @param {HTMLElement} container
*/
function createReviewElement(reviewData, container) {
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

  container.appendChild(reviewCloned);

  return reviewCloned;
}

module.exports = createReviewElement;

