

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function user() {}


user.create_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."driverdetails"( "driver_name", "driver_phonenumber","driver_email", "driver_password")VALUES ($1,$2,$3,$4) RETURNING *',
                 [userInput.driver_name, userInput.driver_phonenumber, userInput.driver_email, userInput.driver_password])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.update_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\

          executor.one('UPDATE public.driverdetails SET  "driver_name"=$1, "driver_phonenumber"=$2, "driver_email"=$3, "driver_password"=$4  WHERE  "driver_id" = $5 RETURNING *',
          [userInput.driver_name, userInput.driver_phonenumber, userInput.driver_email, userInput.driver_password, userInput.driver_id])
                 .then(data => {
                    console.log("1");
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.list_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.driverdetails' , [])
                 .then(data => {
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.delete_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.any('Delete FROM public."driverdetails" WHERE "driver_id"=($1) ' , [userInput.driver_id])    

      .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.fetch_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.any('SELECT * FROM public."driverdetails" WHERE "driver_id"=($1) ' , [userInput.driver_id])    

      .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

module.exports = user;
