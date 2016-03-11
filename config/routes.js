var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunely');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var usersController = require('../controllers/users');
var likesController = require('../controllers/likes');

/*
 * HTML Endpoints
 */

router.route('/')
  .get(usersController.renderLandingPage);

// router.route('/albums')
//   // gets albums index
//   .get(albumsController.renderAlbums)
//   .post(albumsController.createAlbum);

// router.route('/albums/new')
//   .get(albumsController.newAlbum);

// router.route('/albums/:id')
//   // Show album
//   .get(albumsController.renderAlbum)
//   .patch(albumsController.updateAlbum)
//   .delete(albumsController.deleteAlbum);

// router.route('/albums/:id/edit')
//   .get(albumsController.editAlbum);

// router.route('/albums/:id/songs/new')
//   .get(songsController.newSong);

// router.route('/albums/:id/songs/edit')
//   .get(songsController.editSong);

// router.route('/albums/:id/songs')
//   .get(songsController.songIndex)
//   .post(songsController.createSong);
  
// router.route('/albums/:id/songs/:id')
//   .patch(songsController.updateSong)
//   .delete(songsController.deleteSong);


/*
 * JSON API Endpoints
 */

// router.route('/api')
//   .get(albumsController.apiRoot);

// router.route('/api/albums')
//   .get(albumsController.apiAlbums);



module.exports = router;
