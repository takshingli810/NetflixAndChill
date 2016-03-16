var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//unneeded?
// var UserLike = require("./userLike");
// var Like = require("./Like");

//STILL UNSURE ABOUT WHERE THIS REFERENCED DATA WORKS
var UserSchema = new Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthday: String,
  sexualPref: String,
  email: String,
  location: String,
  profilePic: String,
  password_digest: String,
  likes: []
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

//
// likes: {
//     type: Schema.Types.ObjectId,
//     ref: 'Like'
//   }
