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
    return parseInt(formReviewMark.value, 10) < 3;
  }

  /**
   * Check input text in 'name' fild
   */
  function checkNameText() {
    return formReviewName.validity.valid;
  }

  /**
   * Check input text in 'review' fild
   */
  function checkReviewText() {
    if(!formReviewText.required || (formReviewText.required && formReviewText.validity.valid)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Validation elements of form
   */
  function formElementsValidation() {
    formReviewText.required = checkRequiredReviewText();
    formReviewSubmit.disabled = !(checkNameText() && checkReviewText());

    toggleVisibility(fieldsName, checkNameText());
    toggleVisibility(fieldsText, checkReviewText());
    toggleVisibility(formReviewFields, (checkNameText() && checkReviewText()));
  }

  /**
   * @param  {Element} field
   * @param  {Bool} checkField
   */
  var toggleVisibility = function(field, checkField) {
    field.classList[(checkField) ? 'add' : 'remove']('invisible');
  };

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
