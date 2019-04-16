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
	  user: "fliwkupvmihqff",
	  password: "8e35a9453ea003ce673b827e9fbf540dd2d518282c2ca52b58d447024030b901",
	  database: "d5buup7u6c8g7d",
	  port: 5432,
	  host: "ec2-174-129-10-235.compute-1.amazonaws.com",
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