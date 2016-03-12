var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var mongoose = require('mongoose');
// var passport = require('passport');
var expressSession = require('express-session');
var cookieParser   = require("cookie-parser");

// Setting up for config/routes
var routes = require('./config/routes');
// Setting up the Passport Strategies
// require("./config/passport")(passport);

// // session and cookie 
// app.use(cookieParser() );
// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(methodOverride('_method'));
// app.use(logger('dev'));

// View engines
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
// KEEP FOR NOW
// hbs.registerHelper("searchResultsPresent", function(query) {
//   if (query === "") {
//       return true;
//   } else {
//       return false;
//   }
// });
hbs.registerPartials(__dirname + '/views/partials');

hbsutils.registerWatchedPartials(__dirname + '/views/partials');

// {
// **this is the facebook Auth route NEED TO MOVE TO ROUTER.JS** 
//
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   })
// );
// // Logout
// app.get("/logout", function(req, res){
//   req.logout();
//   res.redirect("/");
// });
// ===========================================================
// }


/**********
 * SERVER *
 **********/
app.use(routes);
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});