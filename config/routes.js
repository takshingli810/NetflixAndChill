var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netflixandchill');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var usersController = require('../controllers/usersController');
var likesController = require('../controllers/likesController');
var oAuthController = require('../controllers/oAuthController');
var passport = require('passport');



//Testing landing page
router.route('/')
  .get(usersController.renderLandingPage);

//Testing create (temp)
router.route('/add-movie')
  .get(likesController.renderAddForm);

//about page
router.route('/about')
  .get(function (req, res) {
    res.render("./pages/about");
  });

//matches page, just using for testing views
router.route('/user/matches')
  .get(function(req, res) {
    res.render("./pages/my_matches");
  });

//other user profile, just using for testing views
router.route('/otheruser')
  .get(function(req, res) {
    res.render("./pages/other_profile");
  });

//my profile, just using for testing views
router.route('/myprofile')
  .get(function(req, res) {
    res.render("./pages/my_profile");
  });

//introductory API page route COME BACK TO THIS
router.route('/api')
  .get(usersController.getAPI);

router.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope: 'email'
  }));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/about'
  }));

router.route('/api/users')
  .get(usersController.getUsersAPI);


module.exports = router;
