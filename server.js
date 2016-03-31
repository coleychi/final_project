// REQUIREMENTS
var express = require("express");
var AWS = require("aws-sdk");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var moment = require("moment");
var mongoose = require("mongoose");
var morgan = require("morgan");
var passport = require("passport");
var session = require("express-session");

var MongoStore = require("connect-mongo")(session);

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

// // configure aws
// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
// var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// var S3_BUCKET = "quizapp13";

// // test route for aws
// app.get("/test", function(req, res) {
//   res.render("test_stuff/awstest.ejs");
// })

// app.get('/sign', function(req, res) {
//     AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

//     var s3 = new AWS.S3()
//     var options = {
//       Bucket: S3_BUCKET,
//       Key: req.query.file_name,
//       Expires: 60,
//       ContentType: req.query.file_type,
//       ACL: 'public-read'
//     }

//     s3.getSignedUrl('putObject', options, function(err, data){
//       if(err) return res.send('Error with S3')

//       res.json({
//         signed_request: data,
//         url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
//       })
//     })
//   })

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
// app.use(session({secret: "secretsecret"}));
app.use(session({ 
  secret: "secretsecret",
  store: new MongoStore({
    url: mongoUri,
    autoRemove: "native"
  }),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// require moment
app.locals.moment = require("moment");

// set global variable equal to boolean value of user state (logged in/not logged in)
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated(); // returns boolean
  next();
});

// set gloabl variable equal to user if user is logged in (user object accessible on every ejs page)
app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    // console.log("server.js, req.user: ", req.user);
    // res.locals.user = req.user; // entire user object does not save properly?
    res.locals.username = req.user.username;
    res.locals.userid = req.user.id;
  } 

  next();
});

// // ejs filter
// ejs.filters.timeFromNow = function(date) {
//   return moment(date).fromNow();
// }


// root
app.get("/", function(req, res) {
  res.redirect("/quizzes");
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