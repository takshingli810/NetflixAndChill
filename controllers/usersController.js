var repl = require('repl');
var routes = require('../config/routes');


/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderLandingPage (req, res) {
  // console.log(session.userId);
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


//Show profile --- Jessie -- WORKING
function show (req, res) {
  console.log(req.params.id);
  User.find({_id: req.params.id}, function(err, user) {
   // repl.start('> ').context.user = user;
    if (err) {
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      console.log(user[0]);
      res.render('./pages/my_profile', {user: user[0]}); //sidebar partial is no longer getting passed the user
    }
  });
}

//edit function--get form to edit user -- Jessie -- WORKING
function edit (req, res) {
  User.find({_id: req.params.id}, function(err, user){
    if (err){
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      res.render("./partials/edit_profile", {user: user[0]});
    }
  });
}

//update function -- Jessie -- Working, changes persist
function update (req, res) {
  var id = req.body.userId;
  User.find({_id: id}, function(err, user){
    if (err) {
      res.status(500).send();
      console.log("ERROR: ", err);
    } if (req.body.status) {user.status = req.body.status; }
    if (req.body.firstName) {user.firstName = req.body.firstName; }
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
      sexualPref: user.sexualPref,
      status: user.status
    };
    User.update({_id: id}, edited_details, function(err, user) {
      if (err) {
        console.log("ERROR: ", err);
      } else {
      res.redirect('/users/' + id); //redirects to correct show page URL! DATA IS THERE THANK GOD
      }
    });
  });
}


//Delete a user -- WORKING -- Jessie
//Deletes a user from the database
function destroy (req, res) {
  console.log(req.params.id);
  User.remove({_id: req.params.id}, function(err, users){
    if (err){
      res.status(500).send();
      console.log("ERROR: ", err);
    } else {
      //redirect to logout because you also want to reset the session object w/ user id = to null
      res.redirect("/logout");
    }
  });
}

module.exports = {
  renderLandingPage: renderLandingPage,
  getAPI: getAPI,
  getUsersAPI: getUsersAPI,
  show: show,
  destroy: destroy,
  edit: edit,
  update: update
};
