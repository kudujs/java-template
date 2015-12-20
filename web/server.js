var express = require("express");
var open = require('open');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: '1234567890QWERTY',
	resave: true,
	saveUninitialized: true
}));

app.get("/", function (req, res) {
	res.redirect("/index.jsp");
});

app.get("/index.jsp", function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.sendfile("./src/" + req.path);
});

app.get("/data", function (req, res) {
	res.end("{hello: 'worold'");
});

/*
 app.get("/", checkAuth, function (req, res) {
	res.redirect("/index.jsp");
});
 
 app.get('/data/customer:id.json', checkAuth, function(req, res) {
 var sleep = 0;
 setTimeout(function() {
 res.sendfile("." + req.path);
 
 }, sleep);
 });
 
 
 app.get('/data/product:id.json', checkAuth, function(req, res) {
 var sleep = 0;
 setTimeout(function() {
 res.sendfile("." + req.path);
 
 }, sleep);
 });
 
 
 app.get('/data/person.json', checkAuth, function(req, res) {
 //var body = "hello";
 //res.setHeader('Content-Type', 'application/json');
 var sleep = 0;
 setTimeout(function() {
 res.sendfile("." + req.path);
 
 }, sleep);
 //res.setHeader('Content-Length', Buffer.byteLength(body));
 //res.end(body);
 });
 
 function checkAuth(req, res, next) {
 if (!req.session.user_id) {
 res.redirect("/login.jsp");
 } else {
 next();
 }
 }
 
 app.post('/login', function(req, res) {
 var post = req.body;
 if (post.user == 'test' && post.password == 'test') {
 req.session.user_id = 'test';
 res.redirect('/index.jsp');
 // Simulate J2EE server continuing orig request
 //res.redirect('/data/person.json');
 } else {
 console.log(post.user, post.password)
 res.send('Bad user/pass');
 }
 });
 
 app.get('/logout', function(req, res) {
 delete req.session.user_id;
 res.redirect('/login.jsp');
 });*/

app.use(express.static(__dirname + "/src"));

app.listen(9987);
open('http://localhost:9987/');