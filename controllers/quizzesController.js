// REQUIREMENTS
var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz.js");
var Question = require("../models/question.js");
var User = require("../models/user.js");
var Result = require("../models/result.js");


// ROUTES
// TEST ROUTE
router.get("/testroute", function(req, res) {
  res.render("test_stuff/awstest.ejs")

});


// INDEX-- display quizzes
router.get("/", function(req, res) {
  Quiz.find({}).sort({"timestamp": "asc"}).exec(function(err, quizzes) {
    // res.json(quizzes);
    res.render("quizzes/index.ejs", {
      quizzes: quizzes
    });
  });
});


// NEW-- create new quiz
router.get("/new", isLoggedIn, function(req, res) {
  res.render("quizzes/new.ejs")
});


// NEWQUIZ-- save quiz to database
router.post("/newquiz", isLoggedIn, function(req, res) {
  var userId = req.user._id;
  console.log("user id from /newquiz: ", req.user._id)
  // res.json(req.body);

  var formData = req.body; // save incoming form data to formData variable

  // create new quiz
  var newQuiz = new Quiz({
    title: formData.title,
    author: req.user.username,
    authorId: req.user._id,
    description: formData.description,
    imgUrl: formData.imgUrl 
    // req.user to save user id and username to instance
  }); 

  // save new quiz to instantiate to database
  newQuiz.save(function(err) {

    // parse through form data to save questions
    newQuiz.createQuestions(formData);

    // save results to newQuiz instance
    newQuiz.createResults(formData);

    // confirm entire quiz is accessible
    console.log("new quiz controller: ", newQuiz); // confirms entire quiz is here

    // push next quiz to user
    User.findByIdAndUpdate(userId, {$addToSet: {
      quizzesWritten: newQuiz}}, {new: true}, function(err, updatedUser) {
        console.log("updatedUser: ", updatedUser);
        res.redirect("/quizzes");
    });

  });

});


// SHOW-- show one quiz
router.get("/:quiz_id", function(req, res) {
  Quiz.findById(req.params.quiz_id, function(err, quizData) {
    // res.json(quizData);
    res.render("quizzes/show.ejs", {
      quiz: quizData
    });

  });

});


// GETJSON/:QUIZ_ID-- send quiz data as json
router.get("/getjson/:quiz_id", function(req, res) {
  Quiz.findById(req.params.quiz_id, function(err, quizData) {
    res.json(quizData);
  });
});



// MIDDLEWARE
// ensure a user is loggedin
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, continue
  if (req.isAuthenticated()) {
    return next();
  } else {

  // if they aren't redirect them to the homepage
    res.redirect("/YOUDONTBELONGHERE");

  }; 
};




// EXPORT
module.exports = router;