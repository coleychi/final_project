// REQUIREMENTS
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var session = require("express-session");

var mongoUri = process.env.MONGOLAB_URI || "mongodb://localhost:27017/final_project"
var port = process.env.PORT || 3000;
var app = express();


// MIDDLEWARE
// connect to mongo
mongoose.connect(mongoUri);

// passport requirement
require("./config/passport")(passport);

// configure public folder
app.use(express.static("public"));

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cookie-parser
app.use(cookieParser());

// configure method-override
app.use(methodOverride("_method"))

// configure morgan
app.use(morgan("dev"));

// configure passport sessions
app.use(session({ secret: "secretsecret" }));
app.use(passport.initialize());
app.use(passport.session());


// root
app.get("/", function(req, res) {
  res.send("hello");
});


// CONTROLLERS
// use usersController for /users
var usersController = require("./controllers/usersController.js");
app.use("/users", usersController); 







// LISTEN
app.listen(port, function() {
  console.log("Listening on port: ", port);
});