//ROUTES FOR SHOWING THE EVENTS THE USER IS ATTENDING
//ROUTES TO SHOW THE EVENTS THE USER IS INTERESTED IN
//ROUTES TO SHOW THE EVENTS BASED ON THE CATEGORIES THE USER HAS SUSCRIBED TO

var express=require('express');
var router=express.Router();

//route to show events the user is attending
router.get('/my-attending/:username', function(req,res){
  var UserName=req.params.username;
  req.getConnection(function(err,connection){
    if (err) {
        console.error("Error connecting to database" + err);
        return next(err);
    }
    else {
        console.log("CONNECTED");
        var input='SELECT Event.eventid,Event.eventname,Event.EventDate,Event.MainImage,usersatteding.users_username FROM Event,usersatteding WHERE Event.eventid = usersatteding.event_EventId AND usersatteding.users_username =?';
        connection.query(input,[UserName], function(err,results){
            if (err) {
                console.error("Sql error " + err);
                res.writeHead(500, "Not Found", { "content-type": "application/json" });
                res.end();
            }
            else{
                return res.json(results);
            }
        });
    }
  });
});
//route to show all the events the user is interested in.
router.get('/my-interested/:username', function(req,res){
    var UserName=req.params.username;
    req.getConnection(function(err,connection){
      if (err) {
          console.error("Error " + err);
          return next(err);
      }
      else {
          console.log("CONNECTED");
          var input='SELECT Event.eventid,Event.eventname,Event.MainImage,Event.EventDate,usersinterested.users_username FROM Event,usersinterested WHERE Event.eventid = usersinterested.event_EventId AND usersinterested.users_username =?';
          connection.query(input,[UserName], function(err,results){
              if (err) {
                  console.error("Sql error " + err);
                  res.writeHead(500, "Not Found", { "content-type": "application/json" });
                  res.end();
              }
              else{
                  return res.json(results);
              }
          });

      }
    });
  });
// endpoint to show the events based on the categories the user has suscribed to.
router.get('/my-event-subscriptions/:username',function(req,res,next){
  var UserName=req.params.username;
  req.getConnection(function(err,connection){
    if (err)
    {
        console.error("Error " + err);
        return next(err);
    }
    else {
        console.log("CONNECTED");
        var input='SELECT event.eventid,event.eventname,event.MainImage,event.EventDate,usersubscriptions.Username from event,usersubscriptions where event.CategoryId = usersubscriptions.CategoryId AND usersubscriptions.username = ?';
        connection.query(input,[UserName], function(err,results){
            if (err) {
                console.error("Sql error " + err);
                res.writeHead(500, "Not Found", { "content-type": "application/json" });
                res.end();
            }
            else{
                console.log("successful");
                return res.json(results);
            }
        });
    }
  });
});

module.exports=router;
