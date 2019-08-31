var http = require('http'), fs = require('fs'), finalhandler = require('finalhandler'), serveStatic = require('serve-static'), serve = serveStatic("."), dbCall = require("./helpers/db-call.js");

http.createServer(function(req, res) {
	try {
		if (req.url.lastIndexOf("/userDetails") >= 0) {
			dbCall.methods.getUserDetails(req, res);
		} else if (req.url.lastIndexOf("/createUser") >= 0) {
			dbCall.methods.createUser(req, res);
		} else if (req.url.lastIndexOf("/updateDetails") >= 0) {
			dbCall.methods.updateDetails(req, res);
		} else if (req.url.lastIndexOf("/deleteUser") >= 0) {
			dbCall.methods.deleteUser(req, res);
		} else if (req.url.lastIndexOf("/dologin") >= 0) {
			dbCall.methods.dologin(req, res);
		} else if (req.url.lastIndexOf("/login") >= 0) {
			res.writeHead(200, {
				"Content-Type" : "text/html"
			});
			res.end(fs.readFileSync(__dirname + "/login.html"));
		} else if (req.url.lastIndexOf("/details") >= 0) {
			res.writeHead(200, {
				"Content-Type" : "text/html"
			});
			res.end(fs.readFileSync(__dirname + "/details.html"));
		} else {
			var done = finalhandler(req, res);
			serve(req, res, done);
		}
	} catch (e) {
		console.log(e);
	}
}).listen(9000);