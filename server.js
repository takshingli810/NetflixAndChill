var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
mongoose.connect('mongodb://localhost/netflixandchill');

// passport for facebook OAuth
var passport = require('passport');
var cookieParser   = require("cookie-parser");
var session = require('express-session');

// Setting up for config/routes
var routes = require('./config/routes');

//OAUTH
// Setting up the Passport Strategies
require("./config/passport")(passport);

// // session and cookie
app.use(cookieParser() ); // requiring cookie parser  
// app.use(
//   session({
//     secret:'mySecretKey',
//     resave: false,
//     saveUninitialized: true
//   })
// );
app.use(passport.initialize()); // initialization for passport 
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));

// method override
app.use(methodOverride('_method'));

// View engines
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

//sessions things

/**********
 * SERVER *
 **********/
app.use(routes);
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});


