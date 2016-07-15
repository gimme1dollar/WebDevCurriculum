var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	var queryData = url.parse(req.url, true).query;

	if(req.url.split("?")[0] == "/foo" && req.method == "GET") {
		console.log("aaa");
		res.write("Hello, " + queryData["bar"]);
		res.end();
	}

	if(req.url.split("?")[0] == "/foo" && req.method == "POST") {
		res.write("Hello, " + queryData["bar"]);
		res.end();
	}
}).listen(8080);
