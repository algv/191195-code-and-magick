'use strict';

var utils = require('./utils');

/** @constructor */
function Gallery() {
  var self = this;
  var originURL = window.location.origin;

  this.hashPhoto = '#photo';
  this.regularExpressions = /#photo\/(\S+)/;

  this.createHash = function(url) {
    return this.hashPhoto + url;
  };

  this.getUrlFromHash = function(hash) {
    return hash.slice(self.hashPhoto.length);
  };

  this.checkUrlForHashPhoto = function() {
    var outURL = '';
    if (location.hash.match(self.regularExpressions)) {
      outURL = self.getUrlFromHash(location.hash);
    }
    return outURL;
  };

  this.getKeyForSrcPictures = function(src) {
    return self.pathesToPictures.indexOf(src);
  };

  this.element = document.querySelector('.overlay-gallery');

  this.galleryPreview = this.element.querySelector('.overlay-gallery-preview');

  var buttonCloseGallery = this.element.querySelector('.overlay-gallery-close');
  var buttonPreview = this.element.querySelector('.overlay-gallery-control-left');
  var buttonNext = this.element.querySelector('.overlay-gallery-control-right');

  var previewNumber = this.element.querySelector('.preview-number-current');
  var previewTotal = this.element.querySelector('.preview-number-total');

  this.pictures = [];
  this.pathesToPictures = [];
  this.activePictureNumber = 0;

  /**
 * @param  {Array.string} picturesSRC
 */
  this.savePictures = function(picturesSRC) {
    for(var i = 0; i < picturesSRC.length; i++) {
      var tmpImage = new Image();
      tmpImage.src = picturesSRC[i];

      self.pathesToPictures.push(picturesSRC[i].substring(originURL.length, picturesSRC[i].length));
      self.pictures.push(tmpImage);
    }

    previewTotal.textContent = self.pictures.length;
  };

  /**
 * @param  {number} key
 */
  this.showGallery = function(key) {
    utils.toggleVisibility(self.element, true);

    document.addEventListener('keydown', self._onDocumentKeydownHandler);
    buttonCloseGallery.addEventListener('click', self._onCloseClickHandler);
    buttonCloseGallery.addEventListener('keydown', self._onCloseKeydownHandler);
    buttonNext.addEventListener('click', self._showNextPicture);
    buttonPreview.addEventListener('click', self._showPreviousPicture);

    if (!isNaN(parseFloat(key)) && isFinite(key)) {
      location.hash = self.createHash(self.pathesToPictures[key]);
    } else {
      self.showPicture(key);
    }
  };

  this.showPicture = function(id) {
    var key = id;

    if (typeof id === 'string') {
      key = self.getKeyForSrcPictures(id);
    }

    var tmpSelectorImage = self.galleryPreview.querySelector('img');
    if(tmpSelectorImage) {
      self.galleryPreview.replaceChild(self.pictures[key], tmpSelectorImage);
    } else {
      self.galleryPreview.appendChild(self.pictures[key]);
    }

    utils.toggleVisibility(buttonPreview, key > 0);
    utils.toggleVisibility(buttonNext, key < self.pictures.length - 1);

    self.activePictureNumber = key;
    previewNumber.textContent = parseInt(key, 10) + 1;
  };

  this._showNextPicture = function() {
    if (self.activePictureNumber < self.pictures.length - 1) {
      self.activePictureNumber++;
      location.hash = self.createHash(self.pathesToPictures[self.activePictureNumber]);
    }
  };

  this. _showPreviousPicture = function() {
    if (self.activePictureNumber > 0) {
      self.activePictureNumber--;
      location.hash = self.createHash(self.pathesToPictures[self.activePictureNumber]);
    }
  };

  this._onCloseClickHandler = function() {
    self.hideGallery();
  };

  /**
 * @param {KeyboardEvent} evt
 */
  this._onCloseKeydownHandler = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      self.hideGallery();
    }
  };

  /**
 * @param {KeyboardEvent} evt
 */
  this._onDocumentKeydownHandler = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      self.hideGallery();
    }
  };

  this._onHashChange = function() {
    self.restoreFromHash();
  };

  this.restoreFromHash = function() {
    if (location.hash.match(self.regularExpressions)) {
      self.showPicture(self.getUrlFromHash(location.hash));
    } else {
      self.hideGallery();
    }
  };

  this.hideGallery = function() {
    location.hash = '';
    utils.toggleVisibility(self.element, false);

    document.removeEventListener('keydown', self._onDocumentKeydownHandler);
    buttonCloseGallery.removeEventListener('click', self._onCloseClickHandler);
    buttonCloseGallery.removeEventListener('keydown', self._onCloseKeydownHandler);
  };

  window.addEventListener('hashchange', this._onHashChange);
}

module.exports = new Gallery();
