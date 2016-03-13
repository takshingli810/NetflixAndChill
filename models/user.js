var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    birthdate: Date,
    sexualPref: String,
    location: String,
    profilePic: String,
    password_digest: String
  }
});
