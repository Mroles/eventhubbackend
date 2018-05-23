var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connection = require("express-myconnection");
var morgan = require('morgan');
var mysql = require('mysql');
const bcrypt = require('bcrypt');
var app = express();
var myConnection = require('express-myconnection');
  
 var Dbconfig = require('./config/db');

    //This middleware allows cross-domain requests
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// middleware for our views but its not in use.
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// other middleware for mysql connection, and json and http parsing
app.use(myConnection(mysql, dbOptions, 'pool'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));  //to log every request to the terminal

  // // // // // // // // // // // //
 // ALL OUR ENDPOINTS AND ROUTES //
 // // // // // // // // // // //

app.use(require('./controllers/home')); // home
app.use(require('./controllers/signup')); // Signup endpoint
app.use(require('./controllers/loginHandler')); //login endpoint
app.use(require('./controllers/Search')); // endpoint to handle search queries
app.use(require('./controllers/createEvent')); // endpoint to handle creation of events.
app.use(require('./controllers/myEvents')); // endpoint for the user's events.
app.use(require('./controllers/interested')); // endpoint for the events related to the user
app.use(require('./controllers/settings')); // endpoint for the app settings    
app.use(require('./controllers/notification')); // endpoint for the app notifications                               

app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function(){
	console.log("server is running on port "+ app.get('port'));
});
/*
app.listen(8000, function(){
	console.log("server is running on port 8000");
});
*/