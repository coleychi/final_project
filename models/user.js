// REQUIREMENTS
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");


// SCHEMA
var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, lowercase: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});


// METHODS
// generate hash from user password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid (matches hash)
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


// EXPORT
module.exports = mongoose.model("User", userSchema);