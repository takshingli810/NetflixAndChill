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
router.route('/add-movie')
  .get(likesController.renderAddForm);

//introductory API page route COME BACK TO THIS
router.route('/api')
  .get(usersController.getAPI);

//introductory API page route COME BACK TO THIS
router.route('/api/users')
  .get(usersController.getUsersAPI);

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
