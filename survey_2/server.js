var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var post;

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
 io.sockets.on('connection', function (socket) {
	console.log("WE ARE USING SOCKETS!");
	console.log(socket.id);

	socket.on("new_user", function (data) {
		var random = Math.floor(Math.random() * (101 - 1)) + 1;
		console.log(random);
		var users_array = {name: data.name, age: data.age, language: data.language, comment: data.comment};
	    socket.emit('data', JSON.stringify(users_array));
	    socket.emit('random', random);
		})
	})
})



// io.sockets.on('connection', function (socket) {
// 	console.log("WE ARE USING SOCKETS!");
// 	console.log(socket.id);

	// socket.on("button_clicked", function (data) {
 //    console.log('Someone clicked a button!  Reason: ' + data.reason);
 //    socket.emit('server_response', {response: "sockets are the best!"});
	// })
// })






