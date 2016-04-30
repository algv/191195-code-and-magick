'use strict';

var getReviewElement = require('./get-review-element');

/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
function Review(data, container) {
  this.quizAnswer = 'review-quiz-answer';
  this.quizAnswerActive = 'review-quiz-answer-active';

  this.data = data;
  this.element = getReviewElement(this.data, container);

  this.clickOnQuizAnswer = this.clickOnQuizAnswer.bind(this);
  this.remove = this.remove.bind(this);
  this.element.addEventListener('click', this.clickOnQuizAnswer);

  container.appendChild(this.element);
}

Review.prototype.clickOnQuizAnswer = function(evt) {
  if (evt.target.classList.contains(this.quizAnswer)) {
    evt.target.classList.add(this.quizAnswerActive);
  }
};

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.clickOnQuizAnswer);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;

