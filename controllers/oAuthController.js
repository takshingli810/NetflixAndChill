var Like = require('../models/like');
var User = require('../models/user');
var passport = require('../config/passport');

// redirect to Facebook Auth redirect
function redirectAuthFacebook(req, res){
  console.log("Redirecting to facebook auth");
  res.redirect('/auth/facebook',
    passport.authenticate('facebook'), {scope: 'user'});
}

function callBackAuthFacebook(req,res) {
  console.log("Facebook OAuth calling back");
  res.redirect('/auth/facebook/callback', 
   passport.authenticate('facebook', {
    // this needs to route to profile page for user_id but first need to sort out ID
    successRedirect: "/",
    // also needs to change to route back to where they will get error message for authenicate 
    failureRedirect: "/" 
  })); 
}


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

module.exports = {
  redirectAuthFacebook: redirectAuthFacebook,
  callBackAuthFacebook: callBackAuthFacebook
};