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
// Jessie's routes from Mon Night //
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

//users route to view all users and their attributes
router.route('/api/users')
  .get(usersController.getUsersAPI);

// ************** //
// FaceBook OAuth //
// ************** //

//sessions stuff
app.use(
  session({
    secret:'mySecretKey',
    resave: false,
    saveUninitialized: true
  })
);

// //extend 'req' to help manage sessions
app.use(function (req, res, next) {
    //login a user
    req.login = function (user) {
      req.session.userId = user._id;
    };
    //find current user
    req.currentUser = function (cb) {
      User.findOne({_id: req.session.userId},
        function (err, user) {
          req.user = user;
          cb(null,user);
        });
    };
    //logout current user
    req.logout = function () {
      req.session.userId = null;
      req.user = null;
    };
});

// Facebook OAuth URL
router.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope: 'email,public_profile,user_photos,user_birthday'})
);

// Facebook callback URL

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
        session.userId = user[0].id;
        var id = user[0].id;
      // repl.start('> ').context.user = user;
        // call next to call next function OR just render the view as callback
        res.redirect('/users/' + id);
        // next();
      }
    // }, function(req, res, next) {
    //     res.render('./pages/my_profile', {user: user[0]});      
    });
  })(req, res, next);
});


// router.route('/auth/facebook/callback')
//   .get(passport.authenticate('facebook'), function(err, user, info) {
//     repl.start('> ').context.user = user;
//   })(req, res, next);
  // .get(passport.authenticate('facebook', {successRedirect: "/", failureRedirect: "/"}));
    // WORKING




// Sign out
router.route("/logout")
  .get(function(req, res){
    console.log("LOGGED OUT");
    session.userId = null; //need to be sure that we actually edited the session object! Unsure how to test
    res.redirect("/");
});

module.exports = router;
