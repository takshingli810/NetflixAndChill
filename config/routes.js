var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netflixandchill');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var usersController = require('../controllers/users');
var likesController = require('../controllers/likes');


router.route('/')
  .get(usersController.renderLandingPage);




module.exports = router;
