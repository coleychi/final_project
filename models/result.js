// REQUIREMENTS
var mongoose = require("mongoose");


// SCHEMA
var resultSchema = new mongoose.Schema({
  title: {type: String, required: true},
  imgUrl: {type: String, required: true},
  description: {type: String},
  quizTitle: {type: String},
  quizId: {type: String}
});


// EXPORT
module.exports = mongoose.model("Result", resultSchema);
