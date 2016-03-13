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

router.route('/')
  .get(usersController.renderLandingPage);


router.route('/auth/facebook')
  .get(oAuthController.redirectAuthFacebook);

router.route('/auth/facebook/callback')
  .get(oAuthController.callBackAuthFacebook);
// // facebook OAuth **Need to link to login modal**
// router.route('/auth/facebook', 
//   passport.authenticate('facebook'), {scope: 'user'});

// router.route('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     // this needs to route to profile page for user_id but first need to sort out ID
//     successRedirect: "/",
//     // also needs to change to route back to where they will get error message for authenicate 
//     failureRedirect: "/" 
//   }));

// // Logout
//   router.route("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });


module.exports = router;
