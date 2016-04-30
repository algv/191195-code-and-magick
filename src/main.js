'use strict';

require('./form');
require('./game');
require('./review/review');
require('./review_render');

var gallery = require('./gallery');
var picturesSRC = [];

var photoContainer = document.querySelector('.photogallery');
var arrayOfPictures = document.querySelectorAll('.photogallery-image > img');

Array.prototype.slice.call(arrayOfPictures).forEach(function(picture, key) {
  picturesSRC.push(picture.src);
  arrayOfPictures[key].dataset.number = key;
});

gallery.savePictures(picturesSRC);

var tmpUrlFromHash = gallery.checkUrlForHashPhoto();
if(tmpUrlFromHash.length > 0) {
  gallery.showGallery(tmpUrlFromHash);
}

photoContainer.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.tagName === 'IMG') {
    var activePictureNumber = evt.target.dataset.number;
    gallery.showGallery(activePictureNumber);
  }
});


