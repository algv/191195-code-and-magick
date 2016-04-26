'use strict';

var FilterType = require('./filter-type');

  /**
   * @param  {Array.<Object>} data
   * @param  {string} filter
   */
function filter(data, filterType) {
  var reviewsToFilter = data.slice(0);

  var currentDate = new Date();
  var outsideDate = currentDate.setDate(currentDate.getDate() - 14);

  switch (filterType) {
    case FilterType.ALL:
      break;

    case FilterType.RECENT:
      reviewsToFilter.sort(function(current, next) {
        return new Date(current.date) - new Date(next.date);
      });

      return reviewsToFilter.filter(function(review) {
        return new Date(review.date) > outsideDate;
      });

    case FilterType.GOOD:
      var goodReviews = reviewsToFilter.filter(function(review) {
        return review.rating > 2;
      });
      return goodReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });

    case FilterType.BAD:
      var badReviews = reviewsToFilter.filter(function(review) {
        return review.rating < 3;
      });
      return badReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });

    case FilterType.POPULAR:
      return reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
  }

  return reviewsToFilter;
}

module.exports = filter;
