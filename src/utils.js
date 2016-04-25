'use strict';

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
  }
};


