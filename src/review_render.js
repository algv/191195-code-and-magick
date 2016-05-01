'use strict';

var utils = require('./utils');
var Review = require('./review/review');
var FilterType = require('./filter/filter-type');
var filter = require('./filter/filter');

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var reviewsSection = document.querySelector('.reviews');
var moreReviews = reviewsSection.querySelector('.reviews-controls-more');
var reviewsRadioGroup = reviewsFilter.elements['reviews'];

/*
 * Reviews on page
 * @constant {number}
*/
var PAGE_SIZE = 3;

/*
 * Number curent page
 * @type {number}
*/
var pageNumber = 0;

/** @type {Array.<Object>} */
var reviews = [];

/** @type {Array.<Object>} */
var renderedReviews = [];

/** @type {Array.<Object>} */
var filteredReviews = [];

var storageFilter = localStorage.getItem('filterType');

/** @constant {Filter} */
var DEFAULT_FILTER = storageFilter || FilterType.ALL;

/** @constant {number} */
var REVIEW_LOAD_TIMEOUT = 10000;

  /** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  /** @param {function(Array.<Object>)} callback */
function getReviews(callback) {
  var xhr = new XMLHttpRequest();

  xhr.timeout = REVIEW_LOAD_TIMEOUT;

  reviewsSection.classList.add('reviews-list-loading');

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    reviewsSection.classList.remove('reviews-list-loading');
    callback(loadedData);
  };

  xhr.onerror = function() {
    reviewsSection.classList.add('reviews-load-failure');
  };

  xhr.ontimeout = function() {
    reviewsSection.classList.add('reviews-load-failure');
  };


  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
}

/**
  * @param  {Array.<Object>} data
  * @param  {number} page
  * @param  {boolean} replace
 */
function renderReviews(data, page, replace) {
  if(replace) {
    renderedReviews.forEach(function(review) {
      review.remove();
    });

    renderedReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  data.slice(from, to).forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsList));
  });

  if (utils.isNextPageAvailable(data, pageNumber, PAGE_SIZE)) {
    utils.toggleVisibility(moreReviews, true);
  }
}

function renderNextPages() {
  if (utils.isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
    pageNumber++;
    renderReviews(filteredReviews, pageNumber);
    utils.toggleVisibility(moreReviews, true);
  } else {
    utils.toggleVisibility(moreReviews, false);
  }
}

/** @param {string} filter */
function setFilter(filterType) {
  filteredReviews = filter(reviews, filterType);
  pageNumber = 0;
  renderReviews(filteredReviews, pageNumber, true);
  localStorage.setItem('filterType', filterType);
}

function setFiltrationEnabled() {
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      setFilter(evt.target.getAttribute('for'));
    }
  });
}

utils.toggleVisibility(reviewsFilter, false);
utils.toggleVisibility(reviewsSection, false);

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled();
  setFilter(DEFAULT_FILTER);
  reviewsRadioGroup.value = DEFAULT_FILTER;
  moreReviews.addEventListener('click', renderNextPages);

  utils.toggleVisibility(reviewsFilter, true);
  utils.toggleVisibility(reviewsSection, true);
});
