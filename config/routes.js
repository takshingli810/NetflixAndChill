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

//introductory API page route COME BACK TO THIS
router.route('/api/users')
  .get(usersController.getUsersAPI);



//JESSIE'S ROUTES FROM SUNDAY NIGHT
//edit user route
router.route('/users/:id/edit')
  .get(usersController.edit);

//delete user route
router.route('/users/:id')
  .delete(usersController.destroy);

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
