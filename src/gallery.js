'use strict';

var utils = require('./utils');

var originURL = window.location.origin;

var element = document.querySelector('.overlay-gallery');
var buttonCloseGallery = element.querySelector('.overlay-gallery-close');
var buttonPreview = element.querySelector('.overlay-gallery-control-left');
var buttonNext = element.querySelector('.overlay-gallery-control-right');

var previewNumber = element.querySelector('.preview-number-current');
var previewTotal = element.querySelector('.preview-number-total');


var galleryPreview = element.querySelector('.overlay-gallery-preview');

/** @constructor */
function Gallery() {
  this.pictures = [];
  this.pathesToPictures = [];
  this.activePictureNumber = 0;

  this._onDocumentKeydownHandler = this._onDocumentKeydownHandler.bind(this);
  this._onCloseClickHandler = this._onCloseClickHandler.bind(this);
  this._onCloseKeydownHandler = this._onCloseKeydownHandler.bind(this);
  this._showNextPicture = this._showNextPicture.bind(this);
  this._showPreviousPicture = this._showPreviousPicture.bind(this);

  this._onHashChange = this._onHashChange.bind(this);

  window.addEventListener('hashchange', this._onHashChange);
}

Gallery.prototype.hashPhoto = '#photo';
Gallery.prototype.regularExpressions = /#photo\/(\S+)/;

Gallery.prototype.createHash = function(url) {
  return this.hashPhoto + url;
};

Gallery.prototype.getUrlFromHash = function(hash) {
  return hash.slice(this.hashPhoto.length);
};

Gallery.prototype.checkUrlForHashPhoto = function() {
  var outURL = '';
  if (location.hash.match(this.regularExpressions)) {
    outURL = this.getUrlFromHash(location.hash);
  }
  return outURL;
};

Gallery.prototype.getKeyForSrcPictures = function(src) {
  return this.pathesToPictures.indexOf(src);
};

/**
* @param  {Array.string} picturesSRC
*/
Gallery.prototype.savePictures = function(picturesSRC) {
  for(var i = 0; i < picturesSRC.length; i++) {
    var tmpImage = new Image();
    tmpImage.src = picturesSRC[i];

    this.pathesToPictures.push(picturesSRC[i].substring(originURL.length, picturesSRC[i].length));
    this.pictures.push(tmpImage);
  }

  previewTotal.textContent = this.pictures.length;
};

 /**
 * @param  {number} key
 */
Gallery.prototype.showGallery = function(key) {
  utils.toggleVisibility(element, true);

  document.addEventListener('keydown', this._onDocumentKeydownHandler);
  buttonCloseGallery.addEventListener('click', this._onCloseClickHandler);
  buttonCloseGallery.addEventListener('keydown', this._onCloseKeydownHandler);
  buttonNext.addEventListener('click', this._showNextPicture);
  buttonPreview.addEventListener('click', this._showPreviousPicture);

  if (!isNaN(parseFloat(key)) && isFinite(key)) {
    location.hash = this.createHash(this.pathesToPictures[key]);
  } else {
    this.showPicture(key);
  }
};

Gallery.prototype.showPicture = function(id) {
  var key = id;

  if (typeof id === 'string') {
    key = this.getKeyForSrcPictures(id);
  }

  var tmpSelectorImage = galleryPreview.querySelector('img');
  if(tmpSelectorImage) {
    galleryPreview.replaceChild(this.pictures[key], tmpSelectorImage);
  } else {
    galleryPreview.appendChild(this.pictures[key]);
  }

  utils.toggleVisibility(buttonPreview, key > 0);
  utils.toggleVisibility(buttonNext, key < this.pictures.length - 1);

  this.activePictureNumber = key;
  previewNumber.textContent = parseInt(key, 10) + 1;
};

Gallery.prototype._showNextPicture = function() {
  if (this.activePictureNumber < this.pictures.length - 1) {
    this.activePictureNumber++;
    location.hash = this.createHash(this.pathesToPictures[this.activePictureNumber]);
  }
};

Gallery.prototype. _showPreviousPicture = function() {
  if (this.activePictureNumber > 0) {
    this.activePictureNumber--;
    location.hash = this.createHash(this.pathesToPictures[this.activePictureNumber]);
  }
};

Gallery.prototype._onCloseClickHandler = function() {
  this.hideGallery();
};

/**
* @param {KeyboardEvent} evt
*/
Gallery.prototype._onCloseKeydownHandler = function(evt) {
  if (utils.isDeactivationEvent(evt)) {
    evt.preventDefault();
    this.hideGallery();
  }
};

/**
* @param {KeyboardEvent} evt
*/
Gallery.prototype._onDocumentKeydownHandler = function(evt) {
  if (utils.isDeactivationEvent(evt)) {
    evt.preventDefault();
    this.hideGallery();
  }
};

Gallery.prototype._onHashChange = function() {
  this.restoreFromHash();
};

Gallery.prototype.restoreFromHash = function() {
  if (location.hash.match(this.regularExpressions)) {
    this.showPicture(this.getUrlFromHash(location.hash));
  } else {
    this.hideGallery();
  }
};

Gallery.prototype.hideGallery = function() {
  location.hash = '';
  utils.toggleVisibility(element, false);

  document.removeEventListener('keydown', this._onDocumentKeydownHandler);
  buttonCloseGallery.removeEventListener('click', this._onCloseClickHandler);
  buttonCloseGallery.removeEventListener('keydown', this._onCloseKeydownHandler);
};

module.exports = new Gallery();
