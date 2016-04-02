$(document).ready(function() {

  // $("img").each(function() {
  //   var $this = $(this);

  //   $this.onerror = function() {
  //     $this.remove()
  //   }
  // })


  $("#result-container").hide(); // hides result container

  // access quiz id for ajax call to server
  var quizId = window.location.pathname.replace("/quizzes/", "");
  // console.log(quizId); // confirms quiz id accessed
  var quizData = {}; 
  var userResult = {}; 
  var userId = null;
  var userData = {};
  var quizTaken = false;

  var getQuizData = $.ajax({
    url: "/quizzes/getjson/" + quizId, 
    method: "GET"
  }); // closes getQuizData ajax call

  var getUserData = $.ajax({
    url: "/users/getjson/userdata",
    method: "GET"
  }); // closes getUserData ajax call

  $.when(getQuizData, getUserData)
  .done(function(quizResponse, userResponse) {
    quizData = quizResponse[0]; // save to quizData variable
    console.log(quizData); // confirms data
    userData = userResponse[0]; // save to userData variable
    console.log(userData); // confirms data

    // $("#quiz-container").removeClass("hide"); // display quiz

    //-- check if user has taken quiz already
    // if user is not logged in, set quizTaken to false
    if (typeof(userData) === "string") {

      quizTaken = false;
      // console.log(quizTaken);

    } else {

      userId = userData._id;

      // check if user has taken quiz already
      for (var i = 0; i < userData.results.length; i++) {

        console.log(userData.results[i].quizId);
        
        if (userData.results[i].quizId === quizId) {
          console.log("quiz complete");
          console.log("results: ", userData.results[i]); // result user received when quiz originally taken
          quizTaken = true; // set quizTaken to true
          userResult = userData.results[i]; // save userData to results
          displayResult();
          return // exit function if condition met
          // break; // exit loop if condition is met

        }; 

      }; // closes for loop 

    }; // closes if/else statement (check if quiz has been taken)

    renderQuiz();

    console.log("quiz taken: ", quizTaken);

    console.log(quizTaken)

  }); // closes promise



  // creates click events for options
  var renderQuiz = function() {

    $("#quiz-container").removeClass("hide"); // display quiz
    console.log(quizData.questions.length); // confirming quizData accessible

    // for each question, attach click event to options
    for (var i = 1; i < (quizData.questions.length + 1); i++) {

      $(".q-" + i + " .option").click(clickEvent(i)); // jquery selector needs to be equal to the quiz parent

    }; // closes for loop 

  }; // closes renderQuiz


  // clickEvent attached to each option
  var clickEvent = function(i) {
    return function() {

      // remove class if it exists
      $(".q-" + i + " .option").removeClass("selected"); // jquery selector needs to be equal to the quiz parent
      // console.log($(this)); // confirming event attached to each option

      // add .selected class to clicked element
      $selectedOption = $(this);
      $selectedOption.addClass("selected");

      // access all selected elements
      var selections = $(document).find(".selected").toArray();
      console.log("selections ", selections);
      // console.log(quizData);
      console.log("selections length: ", selections.length);
      console.log("quiz questions length: ", quizData.questions.length);

      // when every question has been answered, generate result
      if (selections.length === quizData.questions.length) {
        console.log("quiz is complete");

        // empty content in results container-- removes existing result if present
        $("#result-container").empty(); // maybe this should be animated

        evaluateResult();

      }; // closes if statement

    }; // closes return function

  }; // closes clickEvent



  // evaluates result
  var evaluateResult = function() {

    // // remove previous result if it exists before evaluating new result
    // console.log("quizTaken: ", quizTaken); // confirming variable accessible
    // console.log("evaluate result, userdata: ", userData); // confirming variable accessible

    if (quizTaken) {
      // remove result from user array
      removeResult();
    }; // cant access quiz taken from here

    var results = quizData.results; // number of possible results
    console.log("results: ", results); // returns array of result objects

    // access all selected elements
    var selections = $(document).find(".selected").toArray();
    // console.log("selections ", selections);

    //-- tally points
    var userPoints = 0; // start at 0

    // iterate through each selection, access id (# of points per options), and add to userPoints
    for (var i = 0; i < selections.length; i++) {

      // console.log(selections[i]);

      var id = parseInt(selections[i].getAttribute("id"));
      // console.log(id);

      userPoints += id

    }; // closes for loop 

    console.log("userPoints: ", userPoints); 

    //-- configure result: determine point range for each possible result
    var maxCount = 0; // maxiumum number of points to receive on quiz
    var minCount = 0; // minimum number of points to receive on quiz

    // iterate over the questions
    for (var i = 0; i < quizData.questions.length; i++) {

      // console.log(quizData.questions[i]);
      // console.log(quizData.questions[i].responseOptions.length);

      maxCount += quizData.questions[i].responseOptions.length; // add a point for each option to maxCount
      minCount += 1; // add a point for each question to minCount

    }; // closes for loop 

    // confirm counts
    // console.log("maxCount: ", maxCount); 
    // console.log("minCount: ", minCount);
    // console.log("results: ", results.length);

    // calculate result ranges (number of points between each result)
    var interval = Math.floor((maxCount - minCount) / (results.length));
    console.log("interval: ", interval);

    // determine user's result
    // can this be dynamic?? there's a lot of repetition here
    switch(results.length){

      // if there are 2 results
      case 2:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          // console.log(results[0]);
        } else {
          userResult = results[1];
          // console.log(results[1]);
        };
        break;

      // if there are 3 results
      case 3:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          // console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          userResult = results[1];
          // console.log(results[1]);
        } else {
          userResult = results[2];
          // console.log(results[2]);
        };
        break;

      // if there are 4 results
      case 4:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          // console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          userResult = results[1];
          // console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          userResult = results[2];
          // console.log(results[2]);
        } else {
          userResult = results[3];
          // console.log(results[3]);
        };
        break;

      // if there are 5 results
      case 5:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          // console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          userResult = results[1];
          // console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          userResult = results[2];
          // console.log(results[2]);
        } else if (userPoints < (minCount + (interval * 4))) {
          userResult = results[3];
          // console.log(results[3]);
        } else {
          userResult = results[4];
          // console.log(results[4]);
        };
        break;

      // if there are 6 results
      case 6:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          // console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          userResult = results[1];
          // console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          userResult = results[2];
          // console.log(results[2]);
        } else if (userPoints < (minCount + (interval * 4))) {
          userResult = results[3];
          // console.log(results[3]);
        } else if (userPoints < (minCount + (interval * 5))) {
          userResult = results[4];
          // console.log(results[4]);
        } else {
          userResult = results[5];
          // console.log(results[5]);
        };
        break;

    }; // closes switch statement

    console.log("user result: ", userResult);

    addResult(); // push (new) result to user model

    displayResult(); // display result on page

  }; // closes evaluateResult function



  // remove result if quiz has already been taken
  var removeResult = function() {
    console.log("removeResult, quizTaken: ", quizTaken); // still need to confirm this
    // console.log("remove result, userid: ", userData._id); // confirms userid accessible
    console.log("original user result: ", userResult._id); // confirms userResult accessible
    resultId = userResult._id;
    quizTaken = false; // toggle to false once removed

    // remove existing result from database
    $.ajax({
      url: "/users/deleteresult/" + resultId,
      method: "PUT"
      }).then(function(err, data) {
        console.log("data: ", data);
        // quizTaken = false; // should be here
      }, function(err, data) {
        console.log("error: ", err);
      })

  }; // closes removeResult


  var addResult = function() {

    console.log("addResult, userdata: ", userId);
    console.log("addResult, quizTaken: ", quizTaken);
    console.log("new userResult being pushed to server: ", userResult)

    // if quiz has not been taken and user is logged in, save result to user
    if (!quizTaken && userId) {
    
      console.log("condition met"); 

      $.ajax({
        url: "/users/pushresult/" + userId,
        method: "PUT",
        data: userResult

        // success function
        }).then(function(err, data) {
          console.log(data);
          quizTaken = true; // toggle quizTaken value to true

        // error function
        }, function(err, data) {
          console.log(err);
      });

    }; // closes if statement

    quizTaken = true; // toggle quizTaken value to true 

  }; // closes addResult


  // show user's result
  var displayResult = function() {

    resultImgUrl = userResult.imgUrl;
    console.log("result image: ", resultImgUrl);

    $resultContainer = $("#result-container");

    $resultContentDiv = $("<div class='content'></div>");

    $resultImageDiv = $("<div class='image'></div>");

    $resultImage = $("<img src='" + resultImgUrl + "' class='img-thumb'>");

    $resultImage.appendTo($resultImageDiv)

    // format title
    $resultHeader = $("<h2></h2>").text("Your Result: " + userResult.title).appendTo($resultContentDiv);
    // format description
    $resultDescription = $("<p></p>").text(userResult.description).appendTo($resultContentDiv);

    $resultContentDiv.appendTo($resultContainer);
    $resultImageDiv.appendTo($resultContainer);

    $resultContainer.show();

    // display share panel
    $sharePanel = $("<div class='share'></div>");
    $sharePanel.appendTo($resultContainer);

    // add button to retake quiz
    $retakeQuiz = $("<i class='fa fa-refresh' id='retake-quiz'></i>");
    $retakeQuiz.appendTo($sharePanel);

    // add facebook
    $shareFacebook = $("<i class='fa fa-facebook' id='share-result-fb'></i>");
    $shareFacebook.appendTo($sharePanel);

    // add twitter
    $shareTwitter = $("<i class='fa fa-twitter' id='share-result-twitter'></i>");
    $shareTwitter.appendTo($sharePanel);

    // add email
    $shareEmail = $("<i class='fa fa-envelope' id='share-result-email'></i>");
    $shareEmail.appendTo($sharePanel);

    parseResultForShare(userResult)


  }; // closes displayResult


  // retake quiz
  $(document).on("click", "#retake-quiz", function(event) {
    
    renderQuiz();

    $("#result-container").empty().hide(); // hides result container
    $(".selected").removeClass("selected"); // removes selected class from options

  });


  var parseResultForShare = function(userResult) {

    console.log("got to parse result function");
    console.log(userResult)

    path = window.location.pathname;
    fullUrl = "http://quizquizquiz.herokuapp.com/" + path;
    // console.log(userResult.title);
    resultName = userResult.title;
    // console.log(quizData)
    quizTitle = quizData.title;
    tweetText = "I got " + resultName + "! " + quizTitle;


    // twitter
    twitterLink = "https://twitter.com/intent/tweet?url=" + fullUrl + "&text=" + tweetText + "&via=" + "quizquizapp"

    // anchor tag to share-- customize
    $tweetLink = $("<a></a>").attr({
      href: twitterLink
    })

    $("#share-result-twitter").wrap($tweetLink);


    // email
    subject = "Check out " + quizTitle + " on QuizQuiz!";
    body = "I took " + quizTitle + " and got " + resultName + ". Get your result here: " + fullUrl + "!";

    var changeSpaces = function(string) {
      return string.replace(/ /g, "%20");
    }; // ensure spaces persist by changing to %20

    emailLink = "mailto:?subject=" + changeSpaces(subject) + "&body=" + changeSpaces(body);

    // anchor tag to share
    $emailLink = $("<a></a>").attr({
      href: emailLink
    });

    $("#share-result-email").wrap($emailLink);

  }; // closes parseResult function


  // SHARE-- fb
  $(document).on("click", "#share-result-fb", function(event) {
    console.log("clicked");
    console.log(quizData);
    console.log(userResult)

      FB.ui({
        method: "feed",
        display: "popup",
        link: fullUrl,
        name: userResult.title,
        description: userResult.description,
        caption: quizData.title + " on QuizQuiz",
        picture: "http://i.imgur.com/tbOFv.png"  // userResult.imgUrl
      }, function(response){});



  });

  // DELETE ENTIRE QUIZ
  // $(document).on("click", "#delete-quiz", function(event) {
  //   // console.log("click");

  //   $.ajax({
  //     url: "../quizzes/deletequiz/" + quizId,
  //     method: "DELETE"
  //     }).then(function(response) {
  //       if(response.redirect) {
  //         window.location.href = response.redirect;
  //       }
  //     }, function(err, data) {
  //       console.log("error: ", err)
  //     })

  // });




}); // closes document.ready



