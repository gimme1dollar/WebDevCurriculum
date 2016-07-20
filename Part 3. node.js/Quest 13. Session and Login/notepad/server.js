var express = require('express'),
	path = require('path'),
	app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var session = require("express-session");
var $ = require('jQuery');

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
				break;
			} else {
				res.redirect('/');
			}
		}
});

app.get('/notepad', function (req, res) {
    var sess = req.session;

		for(var i=0; i<3; i++) {
			if(user[i].auth_token == sess.auth_token) {
				res.sendFile(path.join(__dirname + '/index.html'));
				break;
			} else {
				res.redirect('/');
			}
		}
});

app.post("/note", function(req, res) {
		var sess = req.session;
		var filename = req.body.content;
    var content = req.body.content;

		fs.writeFile("notes/" + filename + ".txt", content, function(err) {
        if(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status: "failure"
            }));
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            status: "success"
        }));
    });
});

app.get("/note", function(req, res) {
    fs.readFile("notes/" + "note.txt", "utf-8", function(err, content) {
        if(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status: "failure"
            }));
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            status: "success",
            content: content
        }));
    });
});


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
