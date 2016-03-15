/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

// //Click on '+' and add movie to user's 'Likes'
function postLikesAPI(req, res) {
    var like = req.body;
    Like.create({title: like}, function(err, like) {
      err ?
        // handle error
        res.status(500).send() :
        // handle success
        // res.status(201).send(JSON.stringify(like));
        res.redirect('/myprofile');
    });
  }

function renderSearchLikes (req, res) {
  res.render('./partials/searchLikes');
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


module.exports = {
	renderSearchLikes: renderSearchLikes,
	getLikesAPI: getLikesAPI,
  postLikesAPI: postLikesAPI
};
