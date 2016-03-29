// REQUIREMENTS
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");


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
  res.redirect("/quizzes");
  // res.render("users/show.ejs")
}); // end login route


// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/users");
});

// ADD RESULT
router.put("/pushresult/:user_id", function(req, res) {
  console.log(req.body);

  result = req.body.data;

  User.findByIdAndUpdate(req.params.user_id, 
    {$addToSet: {results: result}}, {new: true}, function(err, user) {
      console.log(user);
      res.send("done");
      // res.redirect("/quizzes")
  });
});





// EXPORT
module.exports = router;