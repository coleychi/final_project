// REQUIREMENTS
var mongoose = require("mongoose");


// SCHEMA
var questionSchema = new mongoose.Schema({
  questionText: {type: String, required: true, unique: true},
  // questionNumber: {type: Number},
  responseOptions: [{
    text: String,
    points: Number
  }]
});


// EXPORT
module.exports = mongoose.model("Question", questionSchema);