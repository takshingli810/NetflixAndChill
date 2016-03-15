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
    var title = req.body.title;
    UserLike.create({title: title}, function(err, userlike) {
      err ? res.status(500).send() : res.redirect('/api/userLikes');
        // handle success
        // res.status(201).send(JSON.stringify(like));
    });
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
