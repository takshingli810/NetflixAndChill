var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netflixandchill');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var usersController = require('../controllers/users');
var likesController = require('../controllers/likes');


//Testing landing page
router.route('/')
  .get(usersController.renderLandingPage);

//Testing create (temp)
router.route('/add-movie')
  .get(likesController.renderAddForm);

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
