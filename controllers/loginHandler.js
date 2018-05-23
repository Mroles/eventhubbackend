
 var express = require('express');
 var router = express.Router();
 const bcrypt = require("bcrypt");

router.post('/login', function(req,res){
   UserDetails = req.body;
   console.log(UserDetails);

   req.getConnection(function(err, connection) {
    if (err) {
      console.error("Error " + err);
      return next(err);
    }
    else {
      console.log("CONNECTED")
      connection.query( "SELECT password from users WHERE username = ?",[UserDetails.Username], function(err, results, fields){
        if(err){
         console.error("Sql error " + err);
         }

         if(results.length > 0){
            if(results){

              const hash = results[0].password.toString();
              console.log(hash);
              bcrypt.compare(UserDetails.Password, hash ,function(err,response){
                console.log(response);
                if(response === true){
                  //res.writeHead(200,{"content-type":"application/json"});
                  res.end();
                }else{
                 res.writeHead(403,"wrong credentials",{"content-type":"application/json"});
                // res.send(JSON.stringify({data: "Resource not found"}));
                }
              });
            }
         } else {
          console.log("no user exists like that");
          res.writeHead(404,"Resource not found",{"content-type":"application/json"});
          res.end();
         }
      });
    }
  });
});

module.exports = router
