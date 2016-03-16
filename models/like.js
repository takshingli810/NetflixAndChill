var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//not sure if we should change these to reflect OMDB attributes better?
var LikeSchema = new Schema({
  imdbID: String
});

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;

//IF WE WANT MORE DATA STORED WITH US
// title: String,
// imageUrl: String,
// plot: String,
// imdbID: String, //from OMDB JSON object
// yearOfRelease: String
