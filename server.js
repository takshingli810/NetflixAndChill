var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//FOR OAUTH UNCOMMENT THEN
// var passport = require('passport');
// var expressSession = require('express-session');
// var cookieParser   = require("cookie-parser");

// Setting up for config/routes
var routes = require('./config/routes');


//OAUTH
// Setting up the Passport Strategies
// require("./config/passport")(passport);

// // session and cookie
// app.use(cookieParser() );
// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));

// View engines
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');



/**********
 * SERVER *
 **********/
app.use(routes);
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
