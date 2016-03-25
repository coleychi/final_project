// REQUIREMENTS
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");


// ROUTES
// INDEX
router.get("/", function(req, res) {
  res.render("users/index.ejs");
});


// SIGNUP
router.post("/signup", passport.authenticate("local-signup", { 
  failureRedirect: "/failedfailed"}), function(req, res) {
  res.send(req.user); // checks that data persists
}); 


// LOGIN
router.post("/login", passport.authenticate("local-login", { 
  failureRedirect: "/failedfailed"}), function(req, res) {
  // res.send(req.user);
  res.render("users/show.ejs")
}); // end login route


// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/users");
});





// EXPORT
module.exports = router;