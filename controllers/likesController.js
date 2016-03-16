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
  var userID = req.body.users;

  //ensures that imdbID is not inputted twice in the 'likes' db
  //if so, creates like if it's original
  //else it updates the like with additional users
  Like.count({imdbID : imdbID}, function(err, count){
    if(count === 0){
      Like.create({imdbID: imdbID, users: userID}, function(err, like) {
        err ? res.status(500).send() : res.status(201);
      });
    }
    else{
      Like.findOne({imdbID: imdbID}, function(err, likes){
        if(err){
          console.log("WHY!!!!!");
        }
        else{
          users.update(
          {imdbID : imdbID},
          {$push: {users: userID}}
          )
        }
      });
      console.log("more than one like on this movie");
    }


  });

};

//SHOW ALL LIKES OF ALL USERS
function getLikesAPI (req, res){
  Like.find({}, function(err, likes){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({likes: likes});
  });
}

function renderMyLikes (req, res){

}

function renderSearchLikes (req, res) {
  res.render('./partials/searchLikes');
}

module.exports = {
	renderSearchLikes: renderSearchLikes,
	getLikesAPI: getLikesAPI,
  postLikesAPI: postLikesAPI
};
