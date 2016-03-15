/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderLandingPage (req, res) {
  res.render('./pages/landing_page', {user: req.user});
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

//SHOW ALL LIKES OF ALL USERS
function getUsersAPI (req, res){
  User.find(function(err, users){
    if(err){
      console.log("ERROR: ", err);
    }

    res.json({users: users});
  });
}

//JESSIE's CONTROLLER FUNCTIONS FROM SUN NIGHT
//Delete a user --- Jessie
function destroy (req, res) {
  User.remove({_id: req.params.id}, function(err, users){
    if (err){
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      res.redirect("/");
    }
  });
}

//edit function--get form to edit user -- Jessie
function edit (req, res) {
  User.find({_id: req.params.id}, function(err, users){
    if (err){
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      res.render("./partials/edit_profile");
    }
  });
}

//update function: WIP -- Jessie
function update (req, res) {
  User.find({_id: req.params.id}, function(err, user){
    if (err) {
      res.status(500).send();
      console.log("ERROR: ", err);
    }else {
      res.send(JSON.stringify(user));
    }
  });
}

module.exports = {
  renderLandingPage: renderLandingPage,
  getAPI: getAPI,
  getUsersAPI: getUsersAPI,
  destroy: destroy,
  edit: edit,
  update: update
};
