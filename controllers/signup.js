// /signup
// route for creating new account.

var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");

// send the usernames to the front end to check if its taken
router.get('/signup',function(req,res){
  req.getConnection(function(err,connection){
      if (err) {
        console.error("Error " + err);
        return next(err);
      }
      else {
        console.log("CONNECTED");
        connection.query('SELECT username from users',[],function(err,results){
          if(err){
            console.error("Sql error " + err);
            res.writeHead(500,"Internal error",{"content-type":"application/json"});
            res.end();
            }
            return res.json(results);
        })
      }
  })
});
router.post('/signup',function(req, res, next){
   // UserDetails holds the users sign-in data
   var UserDetails = req.body;
   const saltRounds = 10;
   console.log(UserDetails);
  //Establishing connection to EventHub database
 req.getConnection(function(err, connection) {
   if (err) {
     console.error("Error " + err);
     return next(err);
   }
   else {
     console.log("CONNECTED")

   var InsertUserInfo = "INSERT INTO Users (FirstName,LastName,PhoneNumber,Email,UserName,Password) values (?,?,?,?,?,?) ";
    // putting the user info into the table.

    var FirstName =  UserDetails.FirstName.toUpperCase();
    var LastName = UserDetails.LastName.toUpperCase();
     var PhoneNumber = UserDetails.PhoneNumber;
     var Email= UserDetails.Email;
     var UserName = UserDetails.UserName;
     var Password = UserDetails.Password;

// Using bcrypt to hash the password.
 bcrypt.hash(Password, saltRounds, function(err, hash) {
     //query the database to insert into it.
   var query = connection.query( InsertUserInfo,[FirstName,LastName,PhoneNumber,Email,UserName,hash] , function(err, results){
    if(err){
       console.error("Sql error " + err);
       res.writeHead(500,"Internal error",{"content-type":"application/json"});
       res.end();
       }

      res.writeHead(200,{"content-type":"application/json"});
      res.end();
             });
          });
        }
      });
  });

  // HANDLER FOR USER EVENT CATEGORY SUSCRIPTIONS
  router.post('/usercategorysubscription',function(req,res){
    Usercategory_info = req.body;

    req.getConnection(function(err, connection) {
      if (err) {
        console.error("Error " + err);
        return next(err);
      } else {
        console.log("CONNECTED");
        console.log(Usercategory_info);
        var subscribetoCategory = "INSERT INTO usersubscriptions(Username, CategoryId) VALUES (?,?)";
        var query = connection.query(subscribetoCategory,[Usercategory_info.Username,Usercategory_info.CategoryId],
          function(err,results) {

          if (err) {
            console.error("Sql error " + err);
            res.writeHead(400, "Bad request", {
              "content-type": "application/json"
            });
            res.end();

          }

          res.writeHead(200,{"content-type":"application/json"});
          res.end();
          console.log("category subscription successful");
        });
      }
    });
  });
module.exports = router
