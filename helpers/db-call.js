"use strict";
var mysql = require("mysql"), url = require('url');

function makeDBCall(query, callback) {
	try {
		var connection = mysql.createConnection({
			host : 'sql12.freesqldatabase.com',
			user : 'sql12303541',
			password : '94FeWvM9I3',
			database : 'sql12303541',
			port : 3306
		});
		connection.connect();
		connection.query(query, function(error, results, fields) {
			if (error) {
				console.log("inside error...");
				throw error;
			}
			console.log("---->",results);
			callback(results);
		});
		connection.end();
	} catch (e) {
		console.log(e);
	}
}

function dologin(req, res) {
	var url_parts = url.parse(req.url, true), urlparts = url_parts.query,
		query = "SELECT * FROM student_new where student_email='" + urlparts.username + "'";

	makeDBCall(query, function(data) {
		if(data && data[0] && data[0].password && data[0].password == urlparts.passwors) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify({error : false}));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 401;
			res.end(JSON.stringify({error : true}));
		}
	});
}

function getUserDetails(req, res) {
	var query = 'SELECT * FROM student_new';
	makeDBCall(query, function(data) {
		if(data && data[0]) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify(data));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 400;
			res.end(JSON.stringify({error : true}));
		}
	});
}

function updateDetails(req, res) {
	var url_parts = url.parse(req.url, true), urlparts = url_parts.query,
		pid = urlparts.pid,
		id = urlparts.id,
		name = urlparts.name,
		email = urlparts.email,
		className = urlparts.className,
		enrNo = urlparts.enrNo,
		city = urlparts.city,
		country = urlparts.country,
		query = "UPDATE `student_new` SET `student_id`='" + id + "'" +
										",`student_name`='" + name + "'" + 
										",`student_class`='" + className + "'" +
										",`student_email`='" + email + "'" +
										",`student_enrolment_year`='" + enrNo + "'" + 
										",`student_city`='" + city + "'" +
										",`student_country`='" + country + "'" + 
										" WHERE id='" + pid + "'";
	
	makeDBCall(query, function(data) {
		if(data && data.affectedRows) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify(data));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 400;
			res.end(JSON.stringify({error : true}));
		}
	});
}

function deleteUser(req, res) {
	var url_parts = url.parse(req.url, true), urlparts = url_parts.query,
		pid = urlparts.pid,
		query = "DELETE FROM `student_new` WHERE id='" + pid + "'";
	
	makeDBCall(query, function(data) {
		if(data && data.affectedRows) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify(data));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 400;
			res.end(JSON.stringify({error : true}));
		}
	});
}

function createUser(req, res) {
	var url_parts = url.parse(req.url, true), urlparts = url_parts.query,
		pid = urlparts.pid,
		id = urlparts.id,
		name = urlparts.name,
		email = urlparts.email,
		className = urlparts.className,
		enrNo = urlparts.enrNo,
		city = urlparts.city,
		country = urlparts.country,
		password = urlparts.password,
		query = "INSERT INTO `student_new` (`id`, `student_id`, `student_name`, `student_class`, `student_email`, `student_enrolment_year`, `student_city`, `student_country`, `password`) VALUES (" +
				"'"+ pid +"', " + 
				"'"+ id +"', " + 
				"'"+ name +"', " + 
				"'"+ className +"', " + 
				"'"+ email +"', " + 
				"'"+ enrNo +"', " + 
				"'"+ city +"', " +
				"'"+ country +"', " +
				"'"+ password +"')";
	
	makeDBCall(query, function(data) {
		if(data && data.affectedRows) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			res.end(JSON.stringify(data));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 400;
			res.end(JSON.stringify({error : true}));
		}
	});
}

exports.methods = {
	getUserDetails : getUserDetails,
	dologin : dologin,
	updateDetails : updateDetails,
	deleteUser : deleteUser,
	createUser : createUser
};