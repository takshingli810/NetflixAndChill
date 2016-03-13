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
  res.json({
    message: "This is the API for Netflix and Chill",
    documentation_url: "https://github.com/takshingli810/NetlfixAndChill",
    base_url: "http://netflixandchill.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
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
