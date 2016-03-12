/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderLandingPage (req, res) {
  res.render('./partials/landing_page');
}


module.exports = {
	renderLandingPage: renderLandingPage
};