// REQUIREMENTS
var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz.js");
var Question = require("../models/question.js");
var User = require("../models/user.js");
var Result = require("../models/result.js");

// AWS
var aws = require("aws-sdk");
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET = "quizquiz-assets"

// ROUTES
// TEST ROUTE
router.get("/testroute", function(req, res) {
  res.render("test_stuff/awstestsun.ejs")
});

// creates a signed url for put request to s3
router.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


router.post("/testaws", function(req, res) {
  res.json(req.body);
})






// INDEX-- display quizzes
router.get("/", function(req, res) {
  Quiz.find({}).sort({"timestamp": "desc"}).exec(function(err, quizzes) {
    // res.json(quizzes);
    res.render("quizzes/index.ejs", {
      quizzes: quizzes
    });
  });
});


// NEW-- create new quiz
router.get("/new", isLoggedIn, function(req, res) {
  res.render("quizzes/new.ejs")
});

router.get("/newscoredquiz", isLoggedIn, function(req, res) {
  res.render("quizzes/newscoredquiz.ejs")
});

// NEWQUIZ-- test route to form data in json
router.post("/newquiztest", isLoggedIn, function(req, res) {
  res.json(req.body);
});


// NEWQUIZ-- save quiz to database
router.post("/newquiz", isLoggedIn, function(req, res) {
  var userId = req.user._id;
  console.log("user id from /newquiz: ", req.user._id)
  // res.json(req.body);

  var formData = req.body; // save incoming form data to formData variable

  // create new quiz
  var newQuiz = new Quiz({
    title: formData.title,
    author: req.user.username,
    authorId: req.user._id,
    authorIconUrl: req.user.iconUrl,
    description: formData.description,
    imgUrl: formData.imgUrl 
    // req.user to save user id and username to instance
  }); 

  // save new quiz to instantiate to database
  newQuiz.save(function(err) {

    // parse through form data to save questions
    newQuiz.createQuestions(formData);

    // save results to newQuiz instance
    newQuiz.createResults(formData);

    // confirm entire quiz is accessible
    console.log("new quiz controller: ", newQuiz); // confirms entire quiz is here

    // push next quiz to user
    User.findByIdAndUpdate(userId, {$addToSet: {
      quizzesWritten: newQuiz}}, {new: true}, function(err, updatedUser) {
        console.log("updatedUser: ", updatedUser);
        res.redirect("/quizzes/" + newQuiz._id);
    });

  });

});

router.get("/quiztypes", function(req, res) {
  res.render("pages/quizinfo.ejs");
});


// SHOW-- show one quiz
router.get("/:quiz_id", function(req, res) {
  // find quiz and pass data to client-side
  Quiz.findById(req.params.quiz_id, function(err, quizData) {

    console.log("quiz data?: ", quizData)

    // if a quiz with that id is not found, display error page
    if (quizData === null || quizData === undefined) {
      // return res.json("not here");
      return res.render("pages/error.ejs");
    }

    // console.log("SHOW ME QUIZ DATA: ", quizData); // confirm quiz data
    // res.json(quizData);

    // if quiz data is retrieved, render it
    res.render("quizzes/show.ejs", {
      quiz: quizData
    });

  });

});


// EDIT-- edit an existing quiz
router.get("/edit/:quiz_id", function(req, res) {
  // find quiz and pass data to client-side
  Quiz.findById(req.params.quiz_id, function(err, quizData) {
    res.render("quizzes/edit.ejs", {
      quiz: quizData
    });

  });

});


// DELETE QUIZ-- needs to delete the quiz, pull it from the authors array, delete all associated questions 
// and responses, and pull results from array of all users who have taken it
router.delete("/deletequiz/:quiz_id", function(req, res) {
  quizId = req.params.quiz_id;
  userId = req.user.id;
  console.log("userid from delete route: ", userId)

  // find all users who have result matching quizId
  User.find({"results.quizId": quizId}, function(err, usersArray) {
    console.log("users who have taken this quiz: ", usersArray.length);

    // iterate through users who have taken quiz and remove the result
    for (var i = 0; i < usersArray.length; i++) {
      tempUserId = usersArray[i]._id;

      // console.log("user id: ", usersArray[i]._id);
      User.findByIdAndUpdate(tempUserId, {$pull: {

        results: {"quizId": quizId}

        }}, function(err, data) {
        console.log("removed a result")
      });

    }; // closes for loop  

    Quiz.findById(quizId, function(err, quiz) {
    console.log("quiz: ", quiz); // returns the entire quiz object

    quiz.removeQuestions(); // removes questions from questions collection
    quiz.removeResults(); // removes results from results collection

    // pull quiz from author's array
    User.findByIdAndUpdate(userId, {$pull: {
      quizzesWritten: {_id: quizId}}}, {new: true}, function(err, updatedUser) {
        console.log("updated user without the quiz: ", updatedUser);

        // delete quiz
        quiz.remove(function(err) {
          console.log("removed the quiz");
          res.redirect("/quizzes");
        });
  
      });

    });

  }); // db.users.find({"results.quizId": "56fedc6822dcb68175d2d148"}).pretty();


  // Quiz.findById(quizId, function(err, quiz) {
  //   console.log("quiz: ", quiz); // returns the entire quiz object

  //   quiz.removeQuestions();
  //   quiz.removeResults();

  //   // pull quiz from author's array
  //   User.findByIdAndUpdate(userId, {$pull: {
  //     quizzesWritten: {_id: quizId}}}, {new: true}, function(err, updatedUser) {
  //       console.log("updated user without the quiz: ", updatedUser);

  //       // delete quiz
  //       quiz.remove(function(err) {
  //         console.log("removed the quiz")
  //         res.redirect("/quizzes")
  //       });
  
  //   });

  // });

});



// GETJSON/:QUIZ_ID-- send quiz data as json
router.get("/getjson/:quiz_id", function(req, res) {
  Quiz.findById(req.params.quiz_id, function(err, quizData) {
    console.log("getjson route hit");
    console.log("getjson err, ", err);
    console.log("getjson quizData, ", quizData)
    res.json(quizData);
  });
});



// 404 route
// router.get("*", function(req, res) {
//   res.send("this doesn't exist");
// });



// MIDDLEWARE
// ensure a user is loggedin
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, continue
  if (req.isAuthenticated()) {
    return next();
  } else {

  // if they aren't redirect them to the homepage
    res.redirect("../users/newaccount");

  }; 
};




// EXPORT
module.exports = router;