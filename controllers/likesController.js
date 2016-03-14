/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
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
	getLikesAPI: getLikesAPI
};
