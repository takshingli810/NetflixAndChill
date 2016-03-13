var mongoose = require('mongoose');

module.exports = mongoose.model('Like', {
    title: String,
    imageUrl: String,
    plot: String,
    omdbURL: String,
    yearOfRelease: String
});
