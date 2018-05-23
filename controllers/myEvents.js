 // // // // // // // // // // // // // // // // //
// Endpoint for the events the user has created  //
// // // // // // // // // // // // // // // // //

var express = require('express');
var router = express.Router();
var DataTransForm=require("node-json-transform").DataTransform;

// to show all the events the user has created
router.get('/my-events/:username',function(req,res,next){
    var Username = req.params.username;
    // connect to database
    req.getConnection(function(err, connection) {
        if (err) {
          console.error("Error " + err);
          return next(err);
        }
        else {
            console.log("CONNECTED")

            var get_users_events = "SELECT eventid,eventname,MainImage,EventDate FROM event WHERE UserName = ?";
            var query = connection.query( get_users_events, [Username] , function(err, results, fields){
              if(err){
               console.error("Sql error " + err);
               res.writeHead(500,"This Username does not exist or has no events",{"content-type":"application/json"});
               res.end();

              }

              var UserResults = [];
              for (var index in results){
                  var Rowobj = results[index];
                  UserResults.push(Rowobj);
              }
               res.json(UserResults);
             });
           }
          });
});
         //Delete the user's event

router.delete('/my-events/:username/:eventid/delete', function(req,res,next){
    req.getConnection(function(err,connection){
        if(err){
            console.error("Error "+err);
            return next(err);
         }else{
            console.log("connected");
            connection.query('SET FOREIGN_KEY_CHECKS=0',[],function(err,results){

            connection.query('DELETE FROM location where LocationId = (SELECT locationId from event WHERE eventId = ?)',[req.params.eventid],function(err,results){
                if(err){
                    console.error("Sql error " + err);
                    res.writeHead(404,"Resource not found",{"content-type":"application/json"});
                    res.end();

                   }
                 else{
                    connection.query('DELETE FROM event where eventId = ? AND Username = ?',[req.params.eventid,req.params.username],function(err,results){
                        if(err){
                            console.error("Sql error " + err);
                            res.writeHead(404,"Resource not found",{"content-type":"application/json"});
                            res.end();

                           }else{
                     console.log("event has successfully been deleted");
                     res.writeHead(200,"event successfully deleted",{"content-type":"application/json"});
                     res.end();
                 }
              });
            }
        })
      })
     }
  });
});


// Edit an event.
router.put('/my-events/:username/:eventid/edit',function(req,res,next){
    var locId;
    //connecting to database.
    req.getConnection(function(err, connection) {
        if (err) {
          console.error("Error " + err);
          return next(err);
        }
        else {
          console.log("CONNECTED");
        
         var getlocationid='SELECT locationid FROM event WHERE eventid=? ';
         connection.query(getlocationid,[req.params.eventid],function(err, results){
             if (err){
                 console.log("Error");
                 res.writeHead(500, "Error Occured", {
                     "content-type":"application/json"
                 })
             }
             else{
                locId=results[0].locationid;
                }

         });

        var EditEvent = "Update Event Set EventName = ?,CategoryId = ?, MainImage = ?, EventDate = ?, Description = ? WHERE Username = ? AND EventId = ? " ;

        connection.query( EditEvent,[req.body.EventName,req.body.CategoryId,req.body.MainImage,req.body.EventDate,req.body.Description,req.params.username,req.params.eventid] , function(err, results){
           if(err){
            console.error("Sql error " + err);
            res.writeHead(500,"Internal error",{"content-type":"application/json"});
            res.end();
            }
            connection.query('UPDATE Location Set LocationName = ?,Latitude = ?,longitude = ? WHERE LocationId = ?',[req.body.LocationName,req.body.Latitude,req.body.Longitude,locId ], function(err,results){
                if(err){
                    console.error("Sql error " + err);
                    res.writeHead(500,"Internal error",{"content-type":"application/json"});
                    res.end();
                }
           });
           
              res.writeHead(200,"event successfully editted",{"content-type":"application/json"});
              res.end();
             console.log("event successfully editted");
                  })

             }
           });


});
module.exports = router;
