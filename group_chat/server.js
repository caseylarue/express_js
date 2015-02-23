var express = require("express");

var path = require("path");
var session = require('express-session');
var app = express();
app.use(session({secret: 'codingdojorocks'}));
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded());
var post;


var users = [];
var messages = [];

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})





var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	var socket_id = socket.id
	var session_name;

	socket.on("got_new_user", function(name) {
		session_name = name.name;
		var user = {};
		user.name = name.name;
		user.socket_id = socket_id;
		users.push(user);
		io.emit("new_user", {users: users});
	})

	socket.on("message_post",function(message){
		var user_message = {};
		user_message.message = message.message;
		user_message.name = session_name;
		messages.push(user_message);
		io.emit("show_msgs", {messages: messages} );
	})

	socket.on("disconnect", function (data) {
		console.log(socket.id);
		for(var i=0; i<users.length; i++){
			if(users[i].session_id === socket.id) {
				users.splice(i, 1)
				console.log("users after delete:", users);
			}
		}
		// io.emit 	
	})
})



