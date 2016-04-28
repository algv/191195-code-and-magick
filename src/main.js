'use strict';

require('./form');
require('./game');

require('./review/review');

var gallery = require('./gallery');
var picturesSRC = [];

var photoContainer = document.querySelector('.photogallery');
var arrayOfPictures = document.querySelectorAll('.photogallery-image > img');

Array.prototype.slice.call(arrayOfPictures).forEach(function(picture, key) {
  picturesSRC.push(picture.src);
  arrayOfPictures[key].dataset.number = key;
});

gallery.savePictures(picturesSRC);

photoContainer.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.tagName === 'IMG') {
    var activePictureNumber = evt.target.dataset.number;
    gallery.showGallery(activePictureNumber);
  }
});

require('./review_render');
