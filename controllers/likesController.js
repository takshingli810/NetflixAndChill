/************
 * DATABASE *
 ************/
var Like = require('../models/like');
// var UserLike = require('../models/userLike');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

// //Click on '+' and add movie to 'Likes' collection & API
function postLikesAPI(req, res) {
  var imdbID = req.body.imdbID;
  var userID = req.body.userID;
  //ensures that imdbID is not inputted twice in the 'likes' db
  //if so, creates like if it's original
  //else it updates the like with additional users
  Like.count({imdbID : imdbID}, function(err, count){
    if(count === 0){
      Like.create({imdbID: imdbID, users: userID}, function(err, like) {
        err ? res.status(500).send() : res.status(201);
      });
    }
    else {
        Like.findOne({imdbID: imdbID}, function(err, like){
            if(err){
              console.log("ERROR WITH FIND ONE ", err);
            }
            else{
              //FIND IF USER IS ALREADY ON ARRAY
              if (like.users.indexOf(userID)=== -1 ){
                //pushes user onto Like users array
                like.users.push(userID);
                like.save( function(err){
                  if(err){
                    console.log("ERROR WITH SAVE: ", err);
                  }
                  else{
                    res.status(201);
                  }
                });
              };
              console.log(userID);
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


function renderSearchLikes (req, res) {
  res.render('./partials/searchLikes');
}


//DELETE LIKE - push out from queue
//SHOW ALL LIKES OF ALL USERS
function deleteLikesAPI (req, res){
  Like.find({}, function(err, likes){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({likes: likes});
  });
}

module.exports = {
	renderSearchLikes: renderSearchLikes,
	getLikesAPI: getLikesAPI,
  postLikesAPI: postLikesAPI,
  deleteLikesAPI: deleteLikesAPI
};
