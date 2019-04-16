"use strict";

var fs = require("fs"),
    _ = require("lodash"),
    async = require("async"),
    config = require("config"),
    uuidv4 = require("uuid/v4"),
    utils = require("../utils"),
    mustache = require("mustache"),
    passport = require("passport"),
    request = require("superagent"),
    services = require("../services");
var base64ToImage = require('base64-to-image');
var uniqid = require('uniqid');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var base64UrlEncode = require('base64url');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

//var FORGOT_PASSWORD_HTML = fs.readFileSync("www/resetpassword.html", "utf8");
/*
To Maintain Local Session
*/
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.serializeUser(function (appartment_details, done) {
    done(null, appartment_details);
});

passport.deserializeUser(function (appartment_details, done) {
    done(null, appartment_details);
});
passport.serializeUser(function (flatuser, done) {
    done(null, flatuser);
});

passport.deserializeUser(function (flatuser, done) {
    done(null, flatuser);
});

function init() {
}



function signin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.create(req.body.userId, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}
////////register///////

function registerpage(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.create(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}


function loginpages(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.check(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}

// driver register

// function driver_register(req, res, next) {

//        async.waterfall([
//             function (waterfallCallback){
//                 services.user.create_driver(req.body, function (err, result) {
//                 if (err) {
//                     req.log.error({
//                         error: err
//                     }, "Error while getting available users by mobiles");
//                     return res.json(utils.errors["500"]);
//                 }
//                 waterfallCallback(null,result);
//                 });
//             },
//             function (mydata, waterfallCallback){
//                 return res.json(_.merge({
//                     data: mydata 
//                 }, utils.errors["200"]));
//             }
//         ]);

// }

function driver_register(req, res, next) {
    
    async.waterfall([
         function (waterfallCallback){
             services.user.create_driver(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "There was a problem registering the driver`.");
                    return res.json(utils.errors["500"]);
                }
                console.log(result);
                waterfallCallback(null,result);

             });
         },
         function (mydata, waterfallCallback){
            let token = jwt.sign( mydata.driver_id, 'asterix-needs-permit-a-38', {});
            console.log(token);
             return res.json(_.merge({
                auth: true,
                data: token
             }, utils.errors["200"]));
         }
     ]);

}

function driver_register_update(req, res, next) {
console.log(req.body);
       async.waterfall([
            function (waterfallCallback){
                services.user.update_driver(req.body, function (err, result) {
                    if (err) return res.status(500).send("There was a problem finding the user.");

                console.log(result);
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                let token = jwt.sign(mydata.driver_id, 'asterix-needs-permit-a-38', {});
                console.log(token);
                // res.status(200).send({ auth: true, token: token });
                 return res.json(_.merge({
                    auth: true,
                    data: token
                 }, utils.errors["200"]));
             }
        ]);

}

function driver_register_list(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.list_driver(req.data, function (err, result) {
                    if (err) return res.status(500).send("There was a problem finding the user.");
                    if (!result) return res.status(404).send("No user found.");
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}

function driver_register_delete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.delete_driver(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}

function driver_register_fetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetch_driver(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                console.log(result);
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                // let token = jwt.sign(mydata.driver_id, 'asterix-needs-permit-a-38', {});
                // console.log(token);
                // res.status(200).send({ auth: true, token: token });
                 return res.json(_.merge({
                    auth: true,
                    data: mydata
                 }, utils.errors["200"]));
            }
        ]);

}

function driver_login(req, res, next) {

    async.waterfall([
         function (waterfallCallback){
             services.user.check_driver_login(req.body, function (err, result) {
                if (err) return res.status(500).send('Error on the server.');
                console.log(result);
             waterfallCallback(null,result);
             });
         },
         function (mydata, waterfallCallback){
            if (mydata == "Customer Account Not Found")
            {
               return res.json(_.merge({
               }, utils.errors["404"]));   
            } else if (mydata == "Invalid Password"){
               return res.json(_.merge({
               }, utils.errors["401"]));
            } else {
                let token = jwt.sign( mydata.driver_id, 'asterix-needs-permit-a-38', {});
            console.log(token);
             return res.json(_.merge({
                auth: true,
                data: token
             }, utils.errors["200"]));
   
            }
        }
     ]);
   
   }
exports.init = init;
exports.passport = passport;
exports.signin = signin;
exports.registerpage = registerpage ;
exports.loginpages = loginpages;



// diver register
exports.driver_register = driver_register;
exports.driver_register_update = driver_register_update;
exports.driver_register_list = driver_register_list;
exports.driver_register_delete = driver_register_delete;
exports.driver_register_fetch = driver_register_fetch;
exports.driver_login = driver_login;