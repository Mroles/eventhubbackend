var express = require('express');
var router = express.Router();

// endpoint to handle creation of events by a logged in user

router.post('/create-event',function(req,res){
    var EventDetails = req.body;
    console.log(EventDetails);

    //connecting to database...again
    req.getConnection(function(err, connection) {
        if (err) {
          console.error("Error " + err);
          return next(err);
        }
        else {
          console.log("CONNECTED")

        var CreateEvent = "INSERT INTO Event (EventName,CategoryId,MainImage,EventDate,locationId,UserName,Description) values (?,?,?,?,(SELECT LAST_INSERT_ID()),?,?) ";
         // inserting the event details into the table.

         var EventName =  EventDetails.EventName;
         var CategoryId = EventDetails.CategoryId;
          var MainImage = EventDetails.MainImage;
          var EventDate= EventDetails.EventDate;
          var UserName = EventDetails.Username;
          var Description = EventDetails.Description;
          var locationName = EventDetails.LocationName;
          var latitude = EventDetails.Latitude;
          var longitude = EventDetails.Longitude;

        var query = connection.query( "INSERT INTO location (Longitude,Latitude,LocationName) VALUES (?,?,?)",[longitude,latitude,locationName] , function(err, results){
           if(err){
            console.error("Sql error " + err);
            res.writeHead(500,"Internal server error",{"content-type":"application/json"});
            res.end();
            }
              connection.query(CreateEvent,[EventName,CategoryId,MainImage,EventDate,UserName,Description],function(err,results){
                if(err){
                    console.error("Sql error " + err);
                    res.writeHead(500,"Internal server error",{"content-type":"application/json"});
                    res.end();
                    }

              res.writeHead(200,"event successfully created",{"content-type":"application/json"});
               console.log("event successfully created");
               res.end();

                  });
               });
             }
        });
   });

module.exports = router;
