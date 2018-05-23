  //  // // // // // // // // // // // // // //
  //  Searching for events in the database.  //
  // // // // // // // // // // // // // // //
var express = require('express');
var router = express.Router();

router.get('/search',function(req,res){

  var searchquery = req.query.search_query;
  var searchqueryfilter = req.query.category_filter;
  console.log(searchquery);
  console.log(searchqueryfilter);
  //query to search the database.

    req.getConnection(function(err, connection) {
      if (err) {
        console.error("Error " + err);
        return next(err);
      } else {
        console.log("CONNECTED");
      
        if (searchqueryfilter == "0"){
        var search_for_event =
          "SELECT eventid,eventname,EventDate,MainImage from event WHERE eventname REGEXP ? ";
        var query = connection.query(search_for_event, [searchquery], function(
          err,
          results,
          fields
        ) {
          if (err) {
            console.error("Sql error " + err);
            res.writeHead(404, "Error event not found", {
              "content-type": "application/json"
            });
            res.end();
          }

          return res.json(results);
        });
      } else
      {
        var search_for_event =
          "SELECT eventid,eventname,eventdate,Mainimage from event WHERE eventname REGEXP ? AND categoryId = ? ";
        var query = connection.query(search_for_event, [searchquery,searchqueryfilter], function(
          err,
          results,
          fields
        ) {
          if (err) {
            console.error("Sql error " + err);
            res.writeHead(404, "Error event not found", {
              "content-type": "application/json"
            });
            res.end();
          }

          return res.json(results);
        });
      }
    } 
      
    
    })
});

module.exports = router;
