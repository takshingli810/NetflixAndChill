var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var usersController = require('../controllers/usersController');
var likesController = require('../controllers/likesController');
var passport = require('passport');

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
// Jessie's routes from Mon Night //
// *************************** //

//show my profile-- will soon delete.
router.route('/myprofile')
  .get(usersController.showMyProfile);

//show other user profile? WIP
router.route('/users/:id')
  .get(usersController.showOtherProfile)
//delete user route
  .delete(usersController.destroy)
//update user fields
  .put(usersController.update);

//edit user route
router.route('/users/:id/edit')
  .get(usersController.edit);



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

//users route to view all users and their attributes
router.route('/api/users')
  .get(usersController.getUsersAPI);

// ************** //
// FaceBook OAuth //
// ************** //

// Facebook OAuth URL
router.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope: 'email,public_profile,user_photos,user_birthday'
  }));

// Facebook callback URL
router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/myprofile', // this needs to be changed to user profile
    failureRedirect: '/'
  }));

//custom callback in an attempt to pass profile id through to URL
//modeled after passport documentation example.
// router.route('/auth/facebook/callback')
  // .get(function(req, res, next) {
  //   passport.authenticate('facebook', function(err, user, info) {
  //     console.log("HERE WE ARE: ", user);
  //     if (err) {
  //       res.status(401).send();
  //       console.log("ERROR: ", err);
  //     } else if (!user) {
  //       console.log("Not a user");
  //       res.redirect("/");
  //     } else {
  //       req.logIn(user, function(err) {
  //         if (err) {console.log("ERROR: ", err);}
  //         res.redirect('/users/' + req.user.id);
  //       });
  //     }
  //   });
  // });


// Sign out
router.route("/logout")
  .get(function(req, res){
    console.log("LOGGED OUT");
    req.session.user=null;
    req.logout();
    res.redirect("/");
});

module.exports = router;
