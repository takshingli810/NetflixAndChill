// //
// //    SUBJECT TO CHANGE ACCORDINGLY
// //

var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

var OAuth = require('../secrets');
// console.log(OAuth);

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    // console.log("user_id", user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      // console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use('facebook', new FacebookStrategy({
    clientID        : OAuth.fb.clientID,
    clientSecret    : OAuth.fb.clientSecret,
    callbackURL     : 'http://localhost:3000/auth/facebook/callback',
    enableProof     : true,
    profileFields   : ['name', 'emails', 'gender', 'birthday', 'picture.type(large)']
  }, function(access_token, refresh_token, profile, done) {

    // // Use this to see the information returned from Facebook
    // console.log("Profile pic: ", profile.photos[0].value);

    process.nextTick(function() {

      User.findOne({ 'id' : profile.id }, function(err, user) {
        if (err) return done(err);

        if (user) {

          return done(null, user);
        } else {

          var newUser = new User();
          newUser.id           = profile.id;
          newUser.access_token = access_token;
          newUser.firstName    = profile.name.givenName;
          newUser.lastName     = profile.name.familyName;
          newUser.email        = profile.emails[0].value;
          newUser.birthday     = profile._json.birthday;
          newUser.gender       = profile.gender;
          newUser.profilePic   = profile.photos[0].value;

          // console.log("USER: ", newUser);


          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }

      });
    });
  }));

};
