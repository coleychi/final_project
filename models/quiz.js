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
  description: {type: String, required: true},
  imgUrl: {type: String},
  timestamp: {type: Date, default: Date.now},
  questions: [questionSchema],
  results: [resultSchema]
});


// METHODS
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
      newQuestion.responseOptions.push(option);

    }; // closes optionKeys for loop 

    // saves question to database
    newQuestion.save()

    // pushes newQuestion into question array
    newQuiz.questions.push(newQuestion); // push newQuestion to newQuiz instance

    num = num + 1; // add one to number

  }; // closes questionKeys for loop 

  newQuiz.save(function(err, data) {
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
      description: formData[thisResult[1]],
      imgUrl: formData[thisResult[2]],
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






// EXPORT
module.exports = mongoose.model("Quiz", quizSchema);