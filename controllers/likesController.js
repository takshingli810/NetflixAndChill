/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderAddForm (req, res) {
  res.render('./partials/temp_addlikesform');
}

function getAPI(req, res){
  
}

function getLikesAPI (req, res){
  // res.json(Like.find({}, function(err){
  //     if(err){
  //       console.log("ERROR: ", err);
  //       }
  //   });
  //
  // );
}


module.exports = {
	renderAddForm: renderAddForm
};
