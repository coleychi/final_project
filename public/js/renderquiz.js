$(document).ready(function() {

  $("#result-container").hide();

  // access quiz id number
  // var pathname = window.location.pathname;
  // var newPath = pathname.replace("/quizzes/", "");
  // console.log(pathname)
  // console.log(newPath)

  // grab quiz id using window location
  var quizId = window.location.pathname.replace("/quizzes/", "");
  console.log(quizId); // confirms quiz id accessed
  var quizData = {};
  var userResult = {};
  var userId = null;
  var userData = {};
  var quizTaken = null;

  // ajax call to server-- returns quiz datas in json
  // function getQuizData() {
    // $.ajax({
    //   url: "/quizzes/getjson/" + quizId, 
    //   method: "GET"
    //   // success function
    //   }).then(function(data) {
    //     console.log("data: ", data);

    //   // error function
    //   }, function(error) {
    //     console.log("error: ", error);
    // });
  // }; // closes getQuizData function

  // getQuizData()

  // console.log(data)

  // ajax call to server-- returns user data if logged in
  $.ajax({
    url: "/users/getjson/userdata",
    method: "GET"

    // success funtion
    }).then(function(userData) {
      // console.log("user data: ", userData);
      if (userData === "no user") {
        userId = null;
      } else {
        userId = userData._id;
        userData = userData;

        console.log("user id: ", userId);
        console.log("user data from ajax call: ", userData);

        isQuizTaken(userData);

      };

    // error function
    }, function(error) {
      console.log("error: ", error)
  });


  // ajax call to server-- returns quiz data in json
  $.ajax({
    url: "/quizzes/getjson/" + quizId, 
    method: "GET"
    // success function
    }).then(function(data) {
      console.log("data: ", data);
      quizData = data; // saves to global scope
      onSuccess(data); // uses success callback function
      // configureResult();
      $("#quiz-container").removeClass("hide");

    // error function
    }, function(error) {
      console.log("error: ", error);
  });


  // check if user has taken this quiz already
  var isQuizTaken = function(userData) {
    var quizTaken = false;
    console.log("isQuizDone userData: ", userData);
    console.log("this quiz id: ", quizId);

    console.log(userData.results.length);

    for (var i = 0; i < userData.results.length; i++) {
      console.log(userData.results[i].quizId);
      if (userData.results[i].quizId === quizId) {
        console.log("quiz complete");
        console.log("results loop: ", userData.results[i])
        quizTaken = true;
        // save userData to results
        userResult = userData.results[i]; // result user has saved
        break; // exit out of loop if condition is met

      }; 

    }; // closes for loop 
    console.log("quiz taken: ", quizTaken);

    // if quiz has been taken already, hide quiz 
    if (quizTaken) {
      hideQuiz(); 
    };

  };

  // hide quiz function for users who have already taken quiz
  var hideQuiz = function() {
    console.log("hide quiz function executing");

    // hide quiz content
    // var $quizContainer = $("#quiz-container");
    // $quizContainer.hide();
    $("#quiz-container").hide(); // maybe just make everything transparent

    // display result
    // removeResult()
    displayResult(); // invoke displayResult function to show user's result

  };

  // success "callback" for ajax call for quizData
  var onSuccess = function(data) {
    // console.log("success callback: ", data);

    // console.log(quizData)

    console.log(quizData.questions.length);

    // generate click events for each option
    for (var i = 1; i < (quizData.questions.length + 1); i++) {

      // $(".q" + i + ".option").click(function() {

      //   // remove class if it exists
      //   $(".q1 .option").removeClass("selected");

      //   $selectedOption = $(this);
      //   $selectedOption.addClass("selected");


      // });

      // var div = $(".q" + i); 
      // adds click event
      $(".q-" + i + " .option").click(clickEvent(i)) // jquery selector needs to be equal to the quiz parent

      // div.addEventListener("click", function() {
      //   console.log("hi")
      // })

    }; // closes for loop 

  };


  var clickEvent = function(i) {
    return function() {

      // remove class if it exists
      $(".q-" + i + " .option").removeClass("selected"); // jquery selector needs to be equal to the quiz parent

      console.log($(this))

      // add .selected class to clicked element
      $selectedOption = $(this);
      $selectedOption.addClass("selected");


      // access all selected elements
      var selections = $(document).find(".selected").toArray();
      console.log("selections ", selections);
      console.log(quizData);
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
    console.log("quizTaken: ", quizTaken);

    console.log("evaluate result, userdata: ", userData)

    // if (quizTaken) {
    //   removeResult();
    // }; // cant access quiz taken from here

    var results = quizData.results; // number of possible results
    console.log("results: ", results); // returns array of result objects

    var selections = $(document).find(".selected").toArray();
    console.log("selections ", selections);

    // add points
    var userPoints = 0;

    for (var i = 0; i < selections.length; i++) {

      // console.log(selections[i]);

      var id = parseInt(selections[i].getAttribute("id"));
      // console.log(id);

      userPoints += id

    }; // closes for loop 

    console.log(userPoints); 

    // configure result
    var maxCount = 0;
    var minCount = 0;

    // iterate over the questions
    for (var i = 0; i < quizData.questions.length; i++) {

      console.log(quizData.questions[i]);

      console.log(quizData.questions[i].responseOptions.length);

      maxCount += quizData.questions[i].responseOptions.length;

      minCount += 1;

    }; // closes for loop 

    console.log("maxCount: ", maxCount);
    console.log("minCount: ", minCount);
    console.log("results: ", results.length);

    var interval = Math.floor((maxCount - minCount) / (results.length));

    console.log(interval);


    // can this be dynamic?? there's a lot of repetition here
    switch(results.length){

      // if there are 2 results
      case 2:
        if (userPoints < (minCount + interval)) {
          userResult = results[0]
          console.log(results[0]);
        } else {
          userResult = results[1]
          console.log(results[1]);
        };
        break;

      // if there are 3 results
      case 3:
        if (userPoints < (minCount + interval)) {
          console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          console.log(results[1]);
        } else {
          console.log(results[2]);
        };
        break;

      // if there are 4 results
      case 4:
        if (userPoints < (minCount + interval)) {
          userResult = results[0];
          console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          userResult = results[1];
          console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          userResult = results[2];
          console.log(results[2]);
        } else {
          userResult = results[3];
          console.log(results[3]);
        };
        break;

      // if there are 5 results
      case 5:
        if (userPoints < (minCount + interval)) {
          console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          console.log(results[2]);
        } else if (userPoints < (minCount + (interval * 4))) {
          console.log(results[3]);
        } else {
          console.log(results[4]);
        };
        break;

      // if there are 6 results
      case 6:
        if (userPoints < (minCount + interval)) {
          console.log(results[0]);
        } else if (userPoints < (minCount + (interval * 2))) {
          console.log(results[1]);
        } else if (userPoints < (minCount + (interval * 3))) {
          console.log(results[2]);
        } else if (userPoints < (minCount + (interval * 4))) {
          console.log(results[3]);
        } else if (userPoints < (minCount + (interval * 5))) {
          console.log(results[4]);
        } else {
          console.log(results[5]);
        };
        break;

    }; // closes switch statement

    console.log(userResult);
    displayResult();

    // if (userPoints < (minCount + interval)) {
    //   // console.log("result 1");
    //   console.log(results[0])
    // } else {
    //   // console.log("result 2");
    //   console.log(results[1])
    // }


  }; // closes evaluateResult function


  // display result outcome below quiz and submit result to server
  var displayResult = function() {

    console.log("user result: ", userResult);
    resultId = userResult._id;
    console.log("quiz taken:", quizTaken)
    console.log("user id: ", userId)

    $resultContainer = $("#result-container");

    // format title
    $resultHeader = $("<h2></h2>").text("Your Result: " + userResult.title).appendTo($resultContainer);
    // format description
    $resultDescription = $("<p></p>").text(userResult.description).appendTo($resultContainer);

    $resultContainer.show();

    // // if quiz has been taken, remove existing result from user model
    // if (quizTaken) { // putting it here will remove it right away
    //   // console.log("display result: ", userId);
    //   // console.log("display result userData: ", userData);
    //   // console.log("result id: ", userResult._id);
    //   console.log("result id: ", resultId);

    //   $.ajax({
    //     url: "/users/deleteresult/" + resultId,
    //     method: "PUT"
    //     // success function
    //     }).then(function(err, data) {
    //       console.log("GOT HERE")
    //       console.log(data)
    //     // error function
    //     }, function(err, data) {

    //   }); 

    // }; // closes if statement
    console.log("user id", userId)
    

    // push to user's results if user logged in
    if (userId) {
      
      $.ajax({
        url: "/users/pushresult/" + userId,
        method: "PUT",
        data: userResult

        // success function
        }).then(function(err, data) {
          console.log(data);

        // error function
        }, function(err, data) {
          console.log(err);
      });

    }; // closes if statement


    // add button to retake quiz
    $retakeQuiz = $("<button id='retake-quiz'>Retake Quiz</button>");
    $retakeQuiz.appendTo($resultContainer);

  }; // closes displayResult function


  // retake quiz
  $(document).on("click", "#retake-quiz", function(event) {
    
    $("#quiz-container").show(); // display quiz
    // $("#")

    // console.log("userId: ", userId);
    // console.log("user data: ", userData);
    // console.log("resultId: ", resultId);

    removeResult(); // putting this here removes the result as soon as the user clicks
    userResult = {}; // clears result variable
    $("#result-container").empty().hide(); // hides result container
    $(".selected").removeClass("selected"); // removes selected class from options


  });


  // delete result from user array
  var removeResult = function() {
    console.log("Remove Result");
    console.log("userId: ", userId);
    // console.log("user data: ", userData);
    console.log("resultId: ", resultId);

    $.ajax({
      url: "../users/deleteresult/" + resultId,
      method: "PUT"
      }).then(function(err, data) {
        console.log("data: ", data)
      }, function(err, data) {
        console.log("error: ", err)
      })

  }; // closes removeResult function



}); // closes document.ready



