'use strict';

var getReviewElement = require('./get-review-element');

/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
function Review(data, container) {
  var quizAnswer = 'review-quiz-answer';
  var quizAnswerActive = 'review-quiz-answer-active';

  this.data = data;
  this.element = getReviewElement(this.data, container);

  this.clickOnQuizAnswer = function(evt) {
    if (evt.target.classList.contains(quizAnswer)) {
      evt.target.classList.add(quizAnswerActive);
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.clickOnQuizAnswer);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.clickOnQuizAnswer);

  container.appendChild(this.element);
}

module.exports = Review;

