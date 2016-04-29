'use strict';

var utils = require('./utils');

/** @constructor */
function Gallery() {
  var self = this;

  this.element = document.querySelector('.overlay-gallery');

  this.galleryPreview = this.element.querySelector('.overlay-gallery-preview');

  var buttonCloseGallery = this.element.querySelector('.overlay-gallery-close');
  var buttonPreview = this.element.querySelector('.overlay-gallery-control-left');
  var buttonNext = this.element.querySelector('.overlay-gallery-control-right');

  var previewNumber = this.element.querySelector('.preview-number-current');
  var previewTotal = this.element.querySelector('.preview-number-total');

  this.pictures = [];
  this.activePictureNumber = 0;

  /**
 * @param  {Array.string} picturesSRC
 */
  this.savePictures = function(picturesSRC) {
    for(var i = 0; i < picturesSRC.length; i++) {
      var tmpImage = new Image();
      tmpImage.src = picturesSRC[i];
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

    self.showPicture(key);
  };

  this.showPicture = function(id) {
    var tmpSelectorImage = self.galleryPreview.querySelector('img');
    if(tmpSelectorImage) {
      self.galleryPreview.replaceChild(self.pictures[id], tmpSelectorImage);
    } else {
      self.galleryPreview.appendChild(self.pictures[id]);
    }

    utils.toggleVisibility(buttonPreview, id > 0);
    utils.toggleVisibility(buttonNext, id < self.pictures.length - 1);

    self.activePictureNumber = id;
    previewNumber.textContent = parseInt(id, 10) + 1;
  };

  this._showNextPicture = function() {
    if (self.activePictureNumber < self.pictures.length - 1) {
      self.activePictureNumber++;
      self.showPicture(self.activePictureNumber);
    }
  };

  this. _showPreviousPicture = function() {
    if (self.activePictureNumber > 0) {
      self.activePictureNumber--;
      self.showPicture(self.activePictureNumber);
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

  this.hideGallery = function() {
    utils.toggleVisibility(self.element, false);

    document.removeEventListener('keydown', self._onDocumentKeydownHandler);
    buttonCloseGallery.removeEventListener('click', self._onCloseClickHandler);
    buttonCloseGallery.removeEventListener('keydown', self._onCloseKeydownHandler);
  };
}

module.exports = new Gallery();

