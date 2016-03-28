// REQUIREMENTS
var mongoose = require("mongoose");


// SCHEMA
var quizSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String, required: true},
  questions: ,
  results: []
});


// EXPORT
module.exports = mongoose.model("Quiz", quizSchema);