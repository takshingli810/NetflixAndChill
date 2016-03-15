/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var UserLike = require('../models/userLike');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

// //Click on '+' and add movie to 'Likes' collection & API
function postLikesAPI(req, res) {
    var imdbID = req.body.imdbID;

    UserLike.count({imdbID : imdbID}, function(err, count){
      if(count === 0){
        UserLike.create({imdbID: imdbID}, function(err, userlike) {
          err ? res.status(500).send() : res.status(201);
        });
      }
      else{
        console.log("ERROR WITH USER LIKE CREATION ", err);
      }
    })
  }

//SHOW ALL LIKES OF ALL USERS
function getLikesAPI (req, res){
  UserLike.find(function(err, userlikes){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({userlikes: userlikes});
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
