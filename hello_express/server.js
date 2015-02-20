var express = require("express");

var app = express();

// app.get('/', function(request, response) {
// 	response.send("hello express!!!!!!!!!");
// })

app.listen(8000, function() {
	console.log("listening on 8000");
})

//serve up static files
app.use(express.static(__dirname + "/static"));


// #1 npm install express
// #2 node server.js
// #3 nodemon app.js
// #4 npm install ejs: 
//   ejs is a template engine Embedded Javascript
//   sets the location where express will look for ejs views
app.set('views', __dirname + '/views');
//	set the engine itself so that express knows that we are using ejs as opposed to another template engine
app.set('view engine', 'ejs');

app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com", id: 1}, 
        {name: "Jay", email: "jay@codingdojo.com", id: 2},
        {name: "Rory", email: "rory@codingdojo.com", id: 3}, 
        {name: "Andrew", email: "andrew@codingdojo.com", id: 4}
    ];
    response.render('users', {users: users_array});
})

// #5 
// app.HTTP_VERB('URL', function (req, res){});  // HTTP_VERB is either 'get' or 'post' etc...

// #6 
// root route
app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});
// route to process new user form data:
app.post('/users', function (req, res){
  //code to add user to db goes here!
  // redirect the user back to the root route. 
  // All we do is specify the URL we want to go to:
  res.redirect('/');
})

// #7 npm install body-parser
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded());

// #8 
// create a view/index.ejs file


// #9 
// route to process new user form data:
app.post('/users', function (req, res){
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.  
    res.redirect('/')
});

// #10 Data from URL GET data
app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});



