var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  firstName: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  sexualPref: String,
  email: String,
  location: String,
  profilePic: String,
  password_digest: String
});
