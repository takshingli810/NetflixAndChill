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

//JESSIE's CONTROLLER FUNCTIONS FROM MON NIGHT

//Show my profile --- Jessie
function showMyProfile (req, res) {
  // console.log(req.user);
  res.render("./pages/my_profile", {user: req.user});
}

//Show someone else's profile --- Jessie
function showOtherProfile (req, res) {
  console.log("route is working");
}

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

//edit function--get form to edit user --WORKING
function edit (req, res) {
  User.find({_id: req.params.id}, function(err, user){
    if (err){
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      console.log("access token: ", user[0].access_token);
      res.render("./partials/edit_profile", {user: user});
    }
  });
}

//update function: WIP -- Jessie
function update (req, res) {
  User.find({_id: req.params.id}, function(err, user){
    if (err) {
      res.status(500).send();
      console.log("ERROR: ", err);
    } if (req.body.firstName) {user.firstName = req.body.firstName; }
    if (req.body.lastName) {user.lastName = req.body.lastName; }
    if (req.body.gender) {user.gender = req.body.gender; }  
    if (req.body.location) {user.location = req.body.location; }
    if (req.body.birthday) {user.birthday = req.body.birthday; }
    if (req.body.sexualPref) {user.sexualPref = req.body.sexualPref; }
    var edited_details = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      location: user.location,
      birthday: user.birthday,
      sexualPref: user.sexualPref
    };
    User.update({_id: req.params.id}, edited_details, function(err, user) {
      if (err) {
        console.log("ERROR: ", err);
      // } res.send(JSON.stringify(user));
      } res.redirect('/myprofile'); //will later have to change
    });
  });
}

module.exports = {
  renderLandingPage: renderLandingPage,
  getAPI: getAPI,
  getUsersAPI: getUsersAPI,
  showMyProfile: showMyProfile,
  showOtherProfile: showOtherProfile,
  destroy: destroy,
  edit: edit,
  update: update
};
