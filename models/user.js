var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//STILL UNSURE ABOUT WHERE THIS REFERENCED DATA WORKS
var UserSchema = new Schema({
  access_token: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  sexualPref: String,
  email: String,
  facebookID: String,
  status: String,
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

