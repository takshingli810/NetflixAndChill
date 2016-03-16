var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require("./user");


var LikeSchema = new Schema({
  imdbID: String,
  users: []
});

var Like = mongoose.model('Like', LikeSchema);

module.exports = Like;

//IF WE WANT MORE DATA STORED WITH US
// title: String,
// imageUrl: String,
// plot: String,
// imdbID: String, //from OMDB JSON object
// yearOfRelease: String

//  {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   }
