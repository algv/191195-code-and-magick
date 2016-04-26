'use strict';

var utils = require('./utils');

var gallery = document.querySelector('.overlay-gallery');
var galleryPreview = document.querySelector('.overlay-gallery-preview');

var buttonCloseGallery = gallery.querySelector('.overlay-gallery-close');
var buttonPreview = gallery.querySelector('.overlay-gallery-control-left');
var buttonNext = gallery.querySelector('.overlay-gallery-control-right');

var previewNumber = gallery.querySelector('.preview-number-current');
var previewTotal = gallery.querySelector('.preview-number-total');

var pictures = [];
var activePicture;
var activePictureNumber = 0;

/**
 * @param  {Array.Objects} arrayOfPictures
 */
function savePictures(arrayOfPictures) {
  Array.prototype.slice.call(arrayOfPictures).forEach(function(picture, key) {
    pictures.push(picture.src);
    arrayOfPictures[key].dataset.number = key;
  });

  previewTotal.textContent = pictures.length;
  activePicture = galleryPreview.appendChild(new Image());
}

/**
 * @param  {number} key
 */
function showGallery(key) {
  utils.toggleVisibility(gallery, true);

  document.addEventListener('keydown', _onDocumentKeydownHandler);
  buttonCloseGallery.addEventListener('click', _onCloseClickHandler);
  buttonCloseGallery.addEventListener('keydown', _onCloseKeydownHandler);
  buttonNext.addEventListener('click', _showNextPicture);
  buttonPreview.addEventListener('click', _showPreviewPicture);

  showPicture(key);
}

function showPicture(id) {

  activePicture.src = pictures[id];

  utils.toggleVisibility(buttonPreview, id > 0);
  utils.toggleVisibility(buttonNext, id < pictures.length - 1);

  previewNumber.textContent = parseInt(id, 10) + 1;
}

function _showNextPicture() {
  if (activePictureNumber < pictures.length - 1) {
    activePictureNumber++;
    showPicture(activePictureNumber);
  }
}

function _showPreviewPicture() {
  if (activePictureNumber > 0) {
    activePictureNumber--;
    showPicture(activePictureNumber);
  }
}


function _onCloseClickHandler() {
  hideGallery();
}

/**
 * @param {KeyboardEvent} evt
 */
function _onCloseKeydownHandler(evt) {
  if (utils.isDeactivationEvent(evt)) {
    evt.preventDefault();
    hideGallery();
  }
}

/**
 * @param {KeyboardEvent} evt
 */
function _onDocumentKeydownHandler(evt) {
  if (utils.isDeactivationEvent(evt)) {
    evt.preventDefault();
    hideGallery();
  }
}

function hideGallery() {
  utils.toggleVisibility(gallery, false);

  document.removeEventListener('keydown', _onDocumentKeydownHandler);
  buttonCloseGallery.removeEventListener('click', _onCloseClickHandler);
  buttonCloseGallery.removeEventListener('keydown', _onCloseKeydownHandler);
}

module.exports.savePictures = savePictures;
module.exports.showGallery = showGallery;
