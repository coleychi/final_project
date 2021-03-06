// REQUIREMENTS
var express = require("express");
var router = express.Router();
var passport = require("passport");
var Result = require("../models/result.js");
var User = require("../models/user.js");



// ROUTES
// NEW-- renders static create account page
router.get("/newaccount", function(req, res) {
  res.render("users/new.ejs");
}); // rather than serve page, make jquery form render?


// SIGNUP-- creates new user
router.post("/signup", passport.authenticate("local-signup", { 
  failureRedirect: "/failedfailed"}), function(req, res) {
  // res.send(req.user); // checks that data persists
  res.redirect("/quizzes"); // should this be to profile?
}); 


// LOGIN-- signs existing user into account
router.post("/login", passport.authenticate("local-login", { 
  failureRedirect: "/quizzes"}), function(req, res) {
  // res.send(req.user);
  res.redirect("/quizzes");
  // res.render("users/show.ejs")
}); 


// LOGOUT-- logs user out of account, ends user's session
router.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.clearCookie('connect.sid');
    console.log("session ended");
    res.redirect("/quizzes");
  });
});


// PROFILE-- displays user info
router.get("/profile/:user_id", function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    res.render("users/show.ejs", {
      user: user,
      shortenResult: shortenResult
    });
  });
});


// ADD RESULT-- push result to user's results array
router.put("/pushresult/:user_id", function(req, res) {
  // console.log("data: ", req.body);
  var quizId = req.body.quizId
  // console.log("quizId: ", quizId);
  var result = req.body;

  // find user and push result to results array
  User.findByIdAndUpdate(req.params.user_id, {$addToSet: {
    results: result}}, {new: true}, function(err, user) {
      console.log(user);
      res.send("done");
      // res.redirect("/quizzes")
  });
});


// // REMOVE RESULT-- pull result from user's results array
router.put("/deleteresult/:result_id", function(req, res) {
  var resultId = req.params.result_id;
  console.log("req.user: ", req.user); // confirms req.user accessible

  // find user and remove result from results array
  User.findByIdAndUpdate(req.user._id, {$pull: {
    results: {_id: resultId}}}, {new: true}, function(err, user) {
      console.log("updated user: ", user); // confirms updated user
      // res.send("done");
    res.redirect(req.get("referer"));
  });
});


// GETJSON/userdata-- send user data as json
router.get("/getjson/userdata", function(req, res) {

  // if user is logged in, send user data
  if (req.user) {
    console.log("user is authenticated");
    res.json(req.user); // send 
  } else {
    console.log("there is no user");
    res.json("no user");
  };

});




// shorten result descriptions on profile
function shortenResult(string) {
  // return string.length

  // if string is less than 85 characters, do nothing
  if (string.length < 85) {
    return string
  } else {
    // clip at 85 characters
    shortened = string.substring(0, 85);

    // if in middle of word, cut the partial word
    shortened = shortened.substring(0, Math.min(shortened.length, shortened.lastIndexOf(" ")));

    // if remainder is only one word
      // do stuff

    // add ellipses
    shortened += "...";

    return shortened
  }
  // console.log("short result: ", string);
  // return "testing"
};







// EXPORT
module.exports = router;




// TEST ROUTES AND SCRAP CODE
// INDEX
// router.get("/", function(req, res) {
//   res.render("users/index.ejs");
// });

// // REMOVE RESULT
// router.delete("/deleteresult/:result_id", function(req, res) {
//   console.log("/DELETERESULT/:RESULT_ID ROUTE")
//   var resultId = req.params.result_id;
//   console.log("req.user: ", req.user); // confirms req.user accessible

//   // find user and remove result from results array
//   User.findByIdAndUpdate(req.user._id, {$pull: {
//     results: {_id: resultId}}}, {new: true}, function(err, user) {
//       console.log("updated user: ", user); // confirms updated user

//       res.send("DONE!")
//     // res.redirect(req.get("referer"));
//   });
// });
