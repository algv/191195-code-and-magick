'use strict';

var browserCookies = require('browser-cookies');
var utils = require('./utils');

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
    readFromCookies();
    formElementsValidation();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  /**
   * Save 'name' and 'mark' to cookies
   */
  function saveToCookies() {
    var dateCurent = new Date();
    var dateBirth = new Date(dateCurent.getFullYear(), 4, 12);
    var dateExpiresCookies;

    if(dateBirth < dateCurent) {
      dateExpiresCookies = Math.floor((dateCurent - dateBirth) / 24 / 60 / 60 / 1000);
    } else {
      dateBirth.setFullYear(dateBirth.getFullYear() - 1);
      dateExpiresCookies = Math.floor((dateCurent - dateBirth) / 24 / 60 / 60 / 1000);
    }

    browserCookies.set('mark', formReviewMark.value, {expires: dateExpiresCookies});
    browserCookies.set('name', formReviewName.value, {expires: dateExpiresCookies});
  }

  /**
   * Read 'name' and 'mark' from cookies and past in fields
   */
  function readFromCookies() {
    formReviewMark.value = browserCookies.get('mark') || '';
    formReviewName.value = browserCookies.get('name') || '';
  }

  /**
   * Save to cookies on submit form
   * @param  {Event} evt
   */
  formReview.onsubmit = function(evt) {
    evt.preventDefault();

    saveToCookies();

    this.submit();
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

    utils.toggleVisibility(fieldsName, !checkNameText());
    utils.toggleVisibility(fieldsText, !checkReviewText());
    utils.toggleVisibility(formReviewFields, !(checkNameText() && checkReviewText()));
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
