var express = require('express'),
path = require('path'),
app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var session = require("express-session");

var user = [{
	username: "Yhi",
	password: "123",
	auth_token: "sfmsdlkfmklsmfklsmdlfkmsdlkf"
}, {
	username: "Whi",
	password: "123",
	auth_token: "asdfasdfadfasdfasdfasdfasdf"
}, {
	username: "Xhi",
	password: "123",
	auth_token: "qwerqwerqwerqwerqwerqerasdf"
}];


app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}))

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.post("/users", function(req, res) {
	var sess = req.session;
	var username = req.body.username,
	password = req.body.password;

	for(var i=0; i<3; i++) {
		if((username == user[i].username) && (password == user[i].password)) {
			sess.auth_token = user[i].auth_token;
			res.redirect('/notepad');
			return;
		}
	}
	res.redirect('/');
});

app.get('/notepad', function (req, res) {
	var sess = req.session;

	for(var i=0; i<3; i++) {
		if(user[i].auth_token == sess.auth_token) {
			res.sendFile(path.join(__dirname + '/index.html'));
			return;
		}
	}
	res.redirect('/');
});

app.post("/note", function(req, res) {
	var sess = req.session;
	var filename = req.body.filename;
	var dirname;
	var content = req.body.content;

	for(var i=0; i<3; i++) {
		if(user[i].auth_token == sess.auth_token) {
			dirname = "user" + i;
			fs.writeFile("notes/" + dirname + "/" + filename + ".txt", content, function(err) {
				if(err) {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({
						status: "failure"
					}));
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({
						status: "success"
					}));
				}
			});
			return;
		}
	}
});

app.get("/note", function(req, res) {
	var filename = [];
	var content = [];
	for(var i = 0; i < 3; i++) {
		if(req.session.auth_token == user[i].auth_token) {
			var filenames = fs.readdirSync("notes/user" + i);
			var dirname = "notes/user" + i;
			for(var i=0; i < filenames.length; i++) {
				filename.push(filenames[i]);
				content.push(fs.readFileSync(dirname + '/' + filenames[i], "utf-8"));
			}
		}
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			status: "success",
			filenames: filename,
			contents: content
		}));
		return;
	}

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		status: "failure",
	}));
});


app.listen(3000, function () {
	console.log('App listening on port 3000!');
});


/*
, function(err, content) {
	if(err) {
		res.setHeader('Content-Type', 'application/json');
		res.json(JSON.stringify({
			status: "failure"
		}));
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.json(JSON.stringify({
			status: "success",
			content: content
		}


		, function(err, content) {
			if(err) {
				res.setHeader('Content-Type', 'application/json');
				res.json(JSON.stringify({
					status: "failure"
				}));
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.json(JSON.stringify({
					status: "success",
					filename: filename,
				}));
			}
		}
*/
