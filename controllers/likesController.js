/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

// //Click on '+' and add movie to user's 'Likes'
// function createLikes(req, res){
//   // var imdbID = req.body.imdbID;
//
//   console.log("CREATING LIKES");
// }



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
  // createLikes: createLikes
};
