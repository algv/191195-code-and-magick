'use strict';

/** @enum {number} */
var KeyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  RIGHT: 39
};

module.exports = {
  /**
   * Add invisible if  flag === false and delete for flag === true
   * @param  {Element} field
   * @param  {Bool} flag
  */
  toggleVisibility: function(field, flag) {
    field.classList[flag ? 'remove' : 'add']('invisible');
  },

 /**
  * @param {Array} reviews
  * @param {number} page
  * @param {number} pageSize
  * @return {boolean}
 */
  isNextPageAvailable: function(reviewsToCheck, page, pageSize) {
    return page < Math.floor(reviewsToCheck.length / pageSize);
  },

  /**
   * @param  {HTMLElement} element
  */
  checkVisibilty: function(element) {
    return element.getBoundingClientRect().bottom > 0;
  },

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  isActivationEvent: function(evt) {
    return [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.keyCode) > -1;
  },

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  isDeactivationEvent: function(evt) {
    return evt.keyCode === KeyCode.ESC;
  },

  inherit: function(recepient, donor) {
    function EmptyCtor() {}
    EmptyCtor.prototype = donor.prototype;
    recepient.prototype = new EmptyCtor();
  }
};


