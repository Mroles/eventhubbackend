   // // // // // // // // // // // //
 // MYSQL DATABASE CONFIGURATION  //
// // // // // // // // // // // //
var mysql = require('mysql');


var myConnection = require('express-myconnection');

    dbOptions = {
      host: 'eventhubdb.mysql.database.azure.com',
      user: 'Selorm@eventhubdb',
      password: 'Franzl1szt',
      port: 3306,
      database: 'eventhub',
      timezone: 'gmt',
      dateStrings: true
    };

module.exports = myConnection;
 