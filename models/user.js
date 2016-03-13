var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Like = require("./like");

//STILL UNSURE ABOUT WHERE THIS REFERENCED DATA WORKS
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  sexualPref: String,
  email: String,
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

// Close connection on close
// process.on('exit', function() {
//   console.log('About to exit...');
//   mongoose.disconnect(function() {
//     console.log("Disconnected DB");
//     process.exit(); // now exit the node app
//   });
// });
