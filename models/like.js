var mongoose = require('mongoose');

//not sure if we should change these to reflect OMDB attributes better?
module.exports = mongoose.model('Like', {
    title: String,
    imageUrl: String,
    plot: String,
    imdbID: String, //from OMDB JSON object
    yearOfRelease: String
});
