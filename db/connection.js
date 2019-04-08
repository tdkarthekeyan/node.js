"use strict";

const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
const monitor = require('pg-monitor');

monitor.attach(initOptions); // attach to all query events;

monitor.setTheme('matrix'); // change the default theme;

monitor.setLog((msg, info) => {
});
var db;
function getConnection() {
    const cn = {
	  user: "byrggtypxtsfxw",
	  password: "a9bb4801cb41689bd35754a75966634e9016558b58bdedd72de62a869c8d2d02",
	  database: "da3s4aqotkcmoe",
	  port: 5432,
	  host: "ec2-184-73-153-64.compute-1.amazonaws.com",
	  ssl: true
	};
	db = pgp(cn); 
    return db;
}

function getdb() {
    return db;
}

exports.getdb = getdb;
exports.getConnection = getConnection;