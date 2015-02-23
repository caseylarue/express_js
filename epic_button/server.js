var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded());
var post;
var server = app.listen(6789, function() {
 console.log("listening on port 6789");
})


app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})

var io = require('socket.io').listen(server);
var counter = 0;

io.sockets.on('connection', function (socket) {
	io.emit('counter_on_load', {count: counter});

	socket.on("counter_increase", function() {
	counter = counter + 1;
	console.log(counter);
	io.emit("counter_plus", {count: counter} );
	})	

	socket.on("counter_reset", function() {
	counter = 0;
	console.log(counter);
	io.emit("counter_zero", {count: counter});
	})
})	
