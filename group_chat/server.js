var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded());
var post;
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})
var users = [];


app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	socket.on("got_new_user", function(name) {
		users.push(name);
		// var data = JSON.stringify(users);
		// console.log(data);
		io.emit("new_user", {users: users});
	})


})