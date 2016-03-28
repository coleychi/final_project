// REQUIREMENTS
var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz.js");
var Question = require("../models/question.js");


// ROUTES
router.get("/new", function(req, res) {
  res.render("quizzes/new.ejs")
});


router.post("/newquiz", function(req, res) {
  res.json(req.body);

  var formData = req.body; // save incoming form data to formData variable

  // create new quiz
  var newQuiz = new Quiz({
    title: formData.title,
    description: formData.description,
    imgUrl: formData.imgUrl 
    // req.user to save user id and username to instance
  }); 

  // save new quiz to instantiate to database
  newQuiz.save(function(req, res) {

    // parse through form data to save questions
    newQuiz.createQuestions(formData);

    // save results to newQuiz instance
    newQuiz.saveResults(formData);

    // console.log("new quiz controller: ", newQuiz);

  });

});




// EXPORT
module.exports = router;