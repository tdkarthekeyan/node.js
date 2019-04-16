"use strict";

var express = require("express"),
    cors = require("cors"),
    utils = require("../utils"),
    jsonschema = require("./jsonschema"),
    middleware = require("./middleware"),
    AuthController = require("../auth/AuthController"),
    VerifyToken = require('../auth/VerifyToken');

var app = express(),
router = express.Router();

function addRoute(path, method, middlewares) {
    var handlers = [].concat(middlewares);
    handlers.unshift(utils.validator.validate(path, jsonschema));
    router[method.toLowerCase()](path, handlers);
}

app.use("*", [cors(),middleware.passport.initialize(), middleware.passport.session()]);
app.options('*', cors());



addRoute("/authentication/signin", "POST", [middleware.signin]);
addRoute("/authentication/registerpage", "POST", [middleware.registerpage]);
addRoute("/authentication/loginpages", "POST", [middleware.loginpages]);


// create driver

addRoute("/authentication/driver_register", "POST", [middleware.driver_register]);
addRoute("/authentication/driver_register_update", "POST", [middleware.driver_register_update]);
addRoute("/authentication/driver_register_list", "GET", [VerifyToken, middleware.driver_register_list]);
addRoute("/authentication/driver_register_delete", "POST", [middleware.driver_register_delete]);
addRoute("/authentication/driver_register_fetch", "POST", [middleware.driver_register_fetch]);
addRoute("/authentication/driver_login", "POST", [middleware.driver_login]);

app.use(router);

exports.init = middleware.init;
exports.router = app;