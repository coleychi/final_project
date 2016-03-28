// REQUIREMENTS
var mongoose = require("mongoose");
var questionSchema = require("./question.js").schema;
var Question = require("./question.js");


// SCHEMA
var quizSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  imgUrl: {type: String},
  questions: [questionSchema],
  results: []
});


// METHODS
// // parse data
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

      var option = formData[optionKeys[j]]; 
      console.log("option text: ", option); // confirms option text accessed

      // push option to newQuestion
      newQuestion.responseOptions.push(option);


    }; // closes optionKeys for loop 

    newQuestion.save(); // save newQuestion

    newQuiz.questions.push(newQuestion); // push newQuestion to newQuiz instance

    newQuiz.save(); // save changes to new quiz

    num = num + 1; // add one to number

  }; // closes questionKeys for loop 



}; // closes createQuestions method


quizSchema.methods.saveResults = function(formData) {

  var newQuiz = this;

  console.log("new quiz from model: ", newQuiz)

  var keysArray = Object.keys(formData);

  // filter results from formData object
  var filterResultKeys = function(key) {
    return key.indexOf("result") > -1
  };

  var resultKeys = keysArray.filter(filterResultKeys);
  console.log("result keys ", resultKeys)

  for (var i = 0; i < resultKeys.length; i++) {

    var result = formData[resultKeys[i]];

    newQuiz.results.push(result); // push result into results array

    console.log("new quiz ", newQuiz)

  }; // closes resultKeys for loop 

  newQuiz.save(); // save the quiz

}; // closes saveResults method





// EXPORT
module.exports = mongoose.model("Quiz", quizSchema);