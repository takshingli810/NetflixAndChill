var mongoose = require('mongoose');

//not sure if we should change these to reflect OMDB attributes better?
var LikeSchema = mongoose.Schema({
  title: String,
  imageUrl: String,
  plot: String,
  imdbID: String, //from OMDB JSON object
  yearOfRelease: String
});

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
