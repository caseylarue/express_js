var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var post;

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

app.post('/users', function(req, res) {
	console.log("POST DATA", req.body);
	post = req.body;
 	res.redirect('/users');
})

app.get("/users", function (request, response){
	// post { name: 'hi', age: 'there', comment: '' }
   console.log(post.name);
    var user_array = [
        {name: post.name, age: post.age, language: post.language, comment: post.comment}, 
        // {name: "Jay", email: "jay@codingdojo.com", id: 2},
        // {name: "Rory", email: "rory@codingdojo.com", id: 3}, 
        // {name: "Andrew", email: "andrew@codingdojo.com", id: 4}
    ];
    response.render('users', {users: user_array});
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})

