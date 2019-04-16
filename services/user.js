

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");
        var express = require('express');
        var router = express.Router();
        var bodyParser = require('body-parser');
        
        var VerifyToken = require('../auth/VerifyToken');
        
        router.use(bodyParser.urlencoded({ extended: true }));
 
 
function user() {}


user.create_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."test_table"( "driver_name", "driver_phonenumber","driver_email", "driver_password")VALUES ($1,$2,$3,$4) RETURNING *',
                 [userInput.driver_name, userInput.driver_phonenumber, userInput.driver_email, userInput.driver_password])
                      .then(data => {
                 resultCallback(null, data);
        }).catch(error => {
          resultCallback(error,null );
          console.log('ERROR:', error);
        })

};

user.update_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\

          executor.one('UPDATE public.test_table SET  "driver_name"=$1, "driver_phonenumber"=$2, "driver_email"=$3, "driver_password"=$4  WHERE  "driver_id" = $5 RETURNING *',
          [userInput.driver_name, userInput.driver_phonenumber, userInput.driver_email, userInput.driver_password, userInput.driver_id])
                 .then(data => {
              resultCallback(null,data);
            }).catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.list_driver = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.test_table' , [])
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
  executor.any('SELECT * FROM public."test_table" WHERE "driver_id"=($1) ' , [userInput.driver_id])    

      .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};
user.check_driver_login = function (userInput, resultCallback) {
  console.log(userInput);
  var executor = db.getdaata.getdb();
   executor.any('SELECT * FROM public."test_table" WHERE "driver_email"=$1 and  "driver_password"  =$2 ' , [userInput.login_id,userInput.password])
        .then(data => {
          console.log(data.length);
      		if(data.length > 0 ){
            resultCallback(null,data );
      		}
          else
          {
   executor.any('SELECT * FROM public."test_table" WHERE "driver_phonenumber"=$1 and  "driver_password"  =$2 ' , [userInput.login_id,userInput.password])
  .then(data => {
    console.log(data.length);
    if(data.length > 0 ){
      resultCallback(null,data );
    } else if (data.length == 0) {
      executor.any('SELECT * FROM public."test_table"  where "driver_email"=$1 or "driver_phonenumber"=$1 ' , [userInput.login_id])
      .then(data => {
        console.log(data.length)
             if(data.length == 0){
                       var data = "Customer Account Not Found"
                       resultCallback(null,data ); 
             }else{
              if (data.user_password != userInput.password) {
                var data = "Invalid Password"
                resultCallback(null,data );
             }
          }
      })
.catch(error => {
 resultCallback(error,null );
 console.log('ERROR:', error);
})
    }
   })
   .catch(error => {
       resultCallback(error,null );
       console.log('ERROR:', error);
   })
}
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};
module.exports = user;
