/************
 * DATABASE *
 ************/
var Like = require('../models/like');
var User = require('../models/user');

function returnError (err) {
  return console.log(err);
}

function renderAddForm (req, res) {
  res.render('./partials/temp_addmovieform');
}


module.exports = {
	renderAddForm: renderAddForm
};
