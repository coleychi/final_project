// REQUIREMENTS
var express = require("express");
var router = express.Router();


// ROUTES
router.get("/new", function(req, res) {
  res.render("quizzes/new.ejs")
});


router.post("/newquiz", function(req, res) {
  res.json(req.body)
})




// EXPORT
module.exports = router;