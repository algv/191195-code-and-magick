'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var formReview = formContainer.querySelector('.review-form');
  var formReviewMark = formReview.elements['review-mark'];
  var formReviewName = formReview.elements['review-name'];
  var formReviewText = formReview.elements['review-text'];
  var formReviewSubmit = formReview.querySelector('.review-submit');

  var fieldsName = document.querySelector('.review-fields-name');
  var fieldsText = document.querySelector('.review-fields-text');
  var formReviewFields = document.querySelector('.review-fields');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /**
   * If review mark < 3, return false.
   */
  function checkRequiredReviewText() {
    return parseInt(formReviewMark.value, 10) < 3 ? true : false;
  }

  /**
   * Check input text in 'name' fild
   */
  function checkNameText() {
    return formReviewName.value ? true : false;
  }

  /**
   * Check input text in 'review' fild
   */
  function checkReviewText() {
    return formReviewText.value ? true : false;
  }

  /**
   * Validation elements of form
   */
  function formElementsValidation() {
    if(checkRequiredReviewText()) {
      formReviewText.required = true;
      formReviewSubmit.disabled = !(checkNameText() && checkReviewText());
    } else {
      formReviewText.required = false;
      formReviewSubmit.disabled = !checkNameText();
    }

    checkReviewFields();
  }

  /**
   * Invisible labels if field valid
   */
  function checkReviewFields() {
    if(checkNameText()) {
      fieldsName.classList.add('invisible');
    } else {
      fieldsName.classList.remove('invisible');
    }

    if(!formReviewText.required) {
      fieldsText.classList.add('invisible');
    } else if(formReviewText.required && checkReviewText()) {
      fieldsText.classList.add('invisible');
    } else {
      fieldsText.classList.remove('invisible');
    }

    if(!formReviewSubmit.disabled) {
      formReviewFields.classList.add('invisible');
    } else {
      formReviewFields.classList.remove('invisible');
    }
  }

  for(var i = 0; i < formReviewMark.length; i++) {
    formReviewMark[i].onclick = function() {
      formElementsValidation();
    };
  }

  formReviewName.oninput = function() {
    formElementsValidation();
  };

  formReviewText.oninput = function() {
    formElementsValidation();
  };

  formElementsValidation();
})();
