// REQUIREMENTS
var mongoose = require("mongoose");


// SCHEMA
var questionSchema = new mongoose.Schema({
  questionText: {type: String, required: true, unique: true},
  // questionNumber: {type: Number},
  responseOptions: []
});


// EXPORT
module.exports = mongoose.model("Question", questionSchema);