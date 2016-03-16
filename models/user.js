var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Like = require("./like");

//STILL UNSURE ABOUT WHERE THIS REFERENCED DATA WORKS
var UserSchema = new Schema({
  access_token: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthday: String,
  sexualPref: String,
  email: String,
  //hello here, this is new info!
  facebookID: String,
  status: String,
  //this is the end of my new info :)
  location: String,
  profilePic: String,
  password_digest: String,
  likes: [{
    type: Schema.Types.ObjectId,  //NOTE
    ref: 'Like'
  }]
});


var User = mongoose.model('User', UserSchema);

module.exports = User;
