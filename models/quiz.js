// REQUIREMENTS
var mongoose = require("mongoose");
var questionSchema = require("./question.js").schema;
var Question = require("./question.js");
var resultSchema = require("./result.js").schema;
var Result = require("./result.js");


// SCHEMA
var quizSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String}, // saves username
  authorId: {type: String},
  authorIconUrl: {type: String},
  description: {type: String, required: true},
  imgUrl: {type: String},
  timestamp: {type: Date, default: Date.now},
  questions: [questionSchema],
  results: [resultSchema]
});


// METHODS
// ADD METHODS
// create questions and save to quiz
quizSchema.methods.createQuestions = function(formData) {

  // console.log("this ", this)

  var newQuiz = this;

  var keysArray = Object.keys(formData);

  // find the number of questions
  // find number of questions
  var filterQuestionKeys = function(key) {
    return key.indexOf("question") > -1
  };

  // save keys to question text in an array
  var questionKeys = keysArray.filter(filterQuestionKeys); // saves all question keys to questionKeys
  console.log("question keys ", questionKeys);
  
  var num = 1; // set first number to 1

  // iterate through the question keys
  for (var i = 0; i < questionKeys.length; i++) {

    // access the question text
    var question = formData[questionKeys[i]];
    // console.log(question); // confirms question text accessed

    // create new question using schema
    var newQuestion = new Question({
      questionText: question
    });

    // filter out relevant response options from formData object
    var filterOptionKeys = function(key) {
      return key.indexOf("q" + num) > -1;
    };

    var optionKeys = keysArray.filter(filterOptionKeys);
    console.log("option keys ", optionKeys);

    var optionsArray = [];

    // iterate through the response options
    for (var j = 0; j < optionKeys.length; j++) {

      var option = {
        text: null,
        points: null
      }

      option.text = formData[optionKeys[j]]; 
      option.points = (j + 1);
      console.log("option text: ", option); // confirms option text accessed

      // push option to newQuestion
      // newQuestion.responseOptions.push(option);
      optionsArray.push(option)

    }; // closes optionKeys for loop 

    // shuffle options
    console.log("options array: ", optionsArray);
    var shuffledOptions = optionsArray.sort(function() {
      return 0.5 - Math.random()
    });

    console.log("shuffled array: ", optionsArray); // confirms options were shuffled

    // push options into question
    for (var j = 0; j < optionsArray.length; j++) {
      newQuestion.responseOptions.push(optionsArray[j])
    }


    // saves question to database
    console.log("about to save")
    newQuestion.save()

    // pushes newQuestion into question array
    newQuiz.questions.push(newQuestion); // push newQuestion to newQuiz instance

    num = num + 1; // add one to number

  }; // closes questionKeys for loop 

  newQuiz.update(function(err, data) {
    console.log("NEW QUIZ UPDATE LINE 94")
    console.log(newQuiz)
  }); // save changes to new quiz

}; // closes createQuestions method


// create results and save to quiz
quizSchema.methods.createResults = function(formData) {

  var newQuiz = this;

  // console.log("form data from model: ", formData)
  // console.log("new quiz from results model: ", newQuiz);
  // console.log("quiz id from results: ", newQuiz.id)

  var keysArray = Object.keys(formData); // all keys in formData object

  // filter all keys related to results
  var filterAllResultKeys = function(key) {
    return key.indexOf("res") > -1
  };

  var allResultKeys = keysArray.filter(filterAllResultKeys); // all result keys
  console.log("all result keys: ", allResultKeys); // confirming filter

  // filter results from formData object
  var filterResultTitles = function(key) {
    return key.indexOf("result-") > -1
  };

  var resultTitleKeys = keysArray.filter(filterResultTitles); // result titles only (for count)
  console.log("result titles ", resultTitleKeys); // confirming filter


  var num = 1; // start at first result

  for (var i = 0; i < resultTitleKeys.length; i++) {

    // create new filter for contents related to specific result instance
    var filterResultData = function(key) {
      return key.indexOf(num) > -1
    };

    var thisResult = allResultKeys.filter(filterResultData); // returns keys related to result num
    console.log("this result: ", thisResult); // confirms result data bundled properly

    // create new result
    var newResult = new Result({
      title: formData[thisResult[0]],
      imgUrl: formData[thisResult[1]],
      description: formData[thisResult[2]],
      quizTitle: newQuiz.title,
      quizId: newQuiz.id
    });

    newResult.save();

    newQuiz.results.push(newResult);

    num = num + 1;

  }; // closes resultKeys for loop 

  newQuiz.save(); // save quiz with results

}; // closes saveResults method




// push to author's array
// quizSchema.methods.pushToAuthor = function(formData) {
//   console.log("pushToAuthor this: ", this)

// }




// REMOVE METHODS
// remove all questions
quizSchema.methods.removeQuestions = function() {
  console.log("this in removeQuestions: ", this);

  quiz = this;

  // console.log("type of ", typeof(quiz))

  questionsArray = quiz.questions;
  console.log("questions in removeQuestions: ", questionsArray);

  // remove questions from collection
  for (var i = 0; i < questionsArray.length; i++) {

    console.log("question id: ", questionsArray[i]._id);
    questionId = questionsArray[i]._id;

    Question.findByIdAndRemove(questionId);

  }

}

// remove all results
quizSchema.methods.removeResults = function() {

  quiz = this

  resultsArray = quiz.results;
  console.log("results in removeResults: ", resultsArray);

  // remove results from collection
  for (var i = 0; i < resultsArray.length; i++) {

    console.log("result id: ", resultsArray[i]._id);
    resultId = resultsArray[i]._id;

    Result.findByIdAndRemove(resultId);

  }


};


// remove result instances in all users who have it






// EXPORT
module.exports = mongoose.model("Quiz", quizSchema);