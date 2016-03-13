var mongoose = require('mongoose');
var Like = require("./like");

var UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  sexualPref: String,
  email: String,
  location: String,
  profilePic: String,
  password_digest: String,
  //STILL UNSURE ABOUT WHERE THIS REFERENCED DATA WORKS
  likes: [{type: mongoose.Schema.Types.ObjectID, ref: 'Like'}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
