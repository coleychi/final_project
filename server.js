// REQUIREMENTS
var express = require("express");
var AWS = require("aws-sdk");
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

// configure aws
AWS.config.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
AWS.config.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
AWS.config.region = "us-east-1";

// create new s3 instance
var s3 = new AWS.S3();
var bucketParams = {Bucket: "quizapp13"};
s3.createBucket(bucketParams);

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cookie-parser
app.use(cookieParser());

// configure method-override
app.use(methodOverride("_method"));

// configure morgan
app.use(morgan("dev"));

// configure passport sessions
app.use(session({ secret: "secretsecret" }));
app.use(passport.initialize());
app.use(passport.session());

// set gloabl variable equal to user if user is logged in (user object accessible on every ejs page)
app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user; // entire user object (can't access keys using dot notation on other ejs pages?)
  } 

  next();
});


// root
app.get("/", function(req, res) {
  res.send("hello");
});


// CONTROLLERS
// use usersController for /users
var usersController = require("./controllers/usersController.js");
app.use("/users", usersController); 

// use quizzesController for /quizzes
var quizzesController = require("./controllers/quizzesController.js");
app.use("/quizzes", quizzesController);







// LISTEN
app.listen(port, function() {
  console.log("Listening on port: ", port);
});