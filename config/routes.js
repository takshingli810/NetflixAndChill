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


//Testing landing page
router.route('/')
  .get(usersController.renderLandingPage);

//Testing create (temp)
router.route('/search')
  .get(likesController.renderSearchLikes);

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

//introductory API page route
router.route('/api')
  .get(usersController.getAPI);

//users route to view all users and their likes
router.route('/api/users')
  .get(usersController.getUsersAPI);

//likes route to view all movies that have been liked
router.route('/api/likes')
  .get(likesController.getLikesAPI);

///OAUTH STUFFFFFFF!!!!!!! ---------------------------------------

  // {
  // **this is the facebook Auth route NEED TO MOVE TO ROUTER.JS**
  //
  // app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //     successRedirect: '/',
  //     failureRedirect: '/'
  //   })
  // );
  // // Logout
  // app.get("/logout", function(req, res){
  //   req.logout();
  //   res.redirect("/");
  // });
  // ===========================================================
  // }

//-------------------------------------------------------------

module.exports = router;
