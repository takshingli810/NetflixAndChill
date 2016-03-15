var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//not sure if we should change these to reflect OMDB attributes better?
var LikeSchema = new Schema({
  title: String,
  imageUrl: String,
  plot: String,
  imdbID: String, //from OMDB JSON object
  yearOfRelease: String
});

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
