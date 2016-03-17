var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var usersController = require('../controllers/usersController');
var likesController = require('../controllers/likesController');
var passport = require('passport');
var session = require('express-session');
var User = require('../models/user');
//debugging
var repl = require('repl');

// *********** //
// Static Page //
// *********** //

//Landing page
router.route('/')
  .get(usersController.renderLandingPage);

//about page
router.route('/about')
  .get(function (req, res) {
    res.render("./pages/about");
  });

// *************************** //
// Jessie's USER CRUD routes   //
// *************************** //

//edit user route
router.route('/users/:id/edit')
  .get(usersController.edit);

//show profile
router.route('/users/:id')
  .get(usersController.show)
//delete user route
  .delete(usersController.destroy)
//update user details
  .put(usersController.update);


// *************************** //
// Might be changed or deleted //
// *************************** //

//Testing create (temp)
router.route('/search')
  .get(likesController.renderSearchLikes);

//matches page, just using for testing views
router.route('/user/matches')
  .get(function(req, res) {
    res.render("./pages/my_matches",  {user: req.user});
  });

//other user profile, just using for testing views
router.route('/otheruser')
  .get(function(req, res) {
    res.render("./pages/other_profile", {user: req.user});
  });

// *************************** //
// Introductory API Page Route //
// *************************** //

router.route('/api')
  .get(usersController.getAPI);

//likes route to view all movies that have been liked
router.route('/api/likes')
  .get(likesController.getLikesAPI);

router.route('/api/likes')
  .post(likesController.postLikesAPI); //in testing

//users route to view all users and their attributes
router.route('/api/users')
  .get(usersController.getUsersAPI);

//users route to post movies to users array in api
router.route('/api/users')
  .post(usersController.addMoviesToUsersAPI);

//show only user
router.route('/api/users/:id')
  .get(usersController.showUserAPI);

//show user's movies
router.route('/api/users/:id/movies')
  .get(usersController.showUserMoviesAPI);

// ************** //
// FaceBook OAuth //
// ************** //

// Facebook OAuth URL
router.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope: 'email,public_profile,user_photos,user_birthday'})
);

// Facebook callback URL -- Jessie
router.route('/auth/facebook/callback').get(function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    // pull FB id out of user
    var facebookID = user.facebookID;
    // find the associated user w/ that ID
    User.find({facebookID: facebookID}, function(err, user) {
      if (err) {
        res.status(500).send();
        res.redirect("/");
        console.log("ERROR: ", err);
      } else {
        // creating a session obj that contains PID
        req.login(user[0]);
        var id = user[0].id;
        // repl.start('> ').context.user = user;
        // call next to call next function OR just render the view as callback
        res.redirect('/users/' + id);
      }   
    });
  })(req, res, next);
});

//this was built by ilias, do not touch yet! 
// router.route('/auth/facebook/callback')
//   .get(passport.authenticate('facebook'), function(err, user, info) {
//     repl.start('> ').context.user = user;
//   })(req, res, next);
  // .get(passport.authenticate('facebook', {successRedirect: "/", failureRedirect: "/"}));
    // WORKING


// Sign out
router.route("/logout")
  .get(function(req, res){
    req.logout();
    console.log("checking if my session was cleared:", req.session);
    res.redirect("/");
});

module.exports = router;
