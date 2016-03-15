var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//not sure if we should change these to reflect OMDB attributes better?
var UserLikeSchema = new Schema({
  omdbID: String, //from OMDB JSON object
  users: [{
    type: Schema.Types.ObjectId,  //all of the users who like this thing
    ref: 'User'
  }]
});

var UserLike = mongoose.model('UserLike', UserLikeSchema);

module.exports = UserLike;
