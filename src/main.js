'use strict';

require('./form');
require('./game');
require('./review/review');

var gallery = require('./gallery');

var photoContainer = document.querySelector('.photogallery');
var arrayOfPictures = document.querySelectorAll('.photogallery-image > img');

gallery.savePictures(arrayOfPictures);

photoContainer.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.tagName === 'IMG') {
    var activePictureNumber = evt.target.dataset.number;
    gallery.showGallery(activePictureNumber);
  }
});
