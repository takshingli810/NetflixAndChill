/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

// //Click on '+' and add movie to 'Likes' collection & API
function postLikesAPI(req, res) {
    var title = req.body.title;
    var yearOfRelease = req.body.yearOfRelease;
    var imageUrl = req.body.imageUrl;
    var imdbID = req.body.imdbID;
    Like.create({title: title, yearOfRelease: yearOfRelease,
      imageUrl: imageUrl, imdbID: imdbID}, function(err, like) {
      err ? res.status(500).send() : res.redirect('/api/likes');
        // handle success
        // res.status(201).send(JSON.stringify(like));
    });
  }

//SHOW ALL LIKES OF ALL USERS
function getLikesAPI (req, res){
  Like.find(function(err, likes){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({likes: likes});
  });
}

function renderSearchLikes (req, res) {
  res.render('./partials/searchLikes');
}





module.exports = {
	renderSearchLikes: renderSearchLikes,
	getLikesAPI: getLikesAPI,
  postLikesAPI: postLikesAPI
};
