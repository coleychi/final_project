$(document).ready(function() {

  $(".result").hide();

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


  // ajax call to server-- returns quiz datas in json
  $.ajax({
    url: "/quizzes/getjson/" + quizId, 
    method: "GET"

    // success function
    }).then(function(data) {
      console.log("data: ", data);
      quizData = data; // saves to global scope
      onSuccess(data); // uses success callback function
      // configureResult();

    // error function
    }, function(error) {
      console.log("error: ", error);
  });


  // success callback for ajax call
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
      $(".q" + i + " .option").click(clickEvent(i))

      // div.addEventListener("click", function() {
      //   console.log("hi")
      // })

    }; // closes for loop 

  };


  var clickEvent = function(i) {
    return function() {

      // remove class if it exists
      $(".q" + i + " .option").removeClass("selected");

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
        evaluateResult();
      }; // closes if statement

    }; // closes return function

  }; // closes clickEvent


  // // configure results
  // var configureResult = function() {
  //   // calculate range-- maybe move this to its own function?
  //   console.log(quizData);

  //   var maxCount = 0;
  //   var minCount = 0;

  //   // iterate over the questions
  //   for (var i = 0; i < quizData.questions.length; i++) {

  //     console.log(quizData.questions[i]);

  //     console.log(quizData.questions[i].responseOptions.length);

  //     maxCount += quizData.questions[i].responseOptions.length;

  //     minCount += 1;

  //   };

  //   console.log("maxCount: ", maxCount);
  //   console.log("minCount: ", minCount);

  // };



  // evaluates result
  var evaluateResult = function() {

    var results = quizData.results; // number of possible results
    console.log(results);

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

    console.log(interval)


    // can this be dynamic?? there's a lot of repetition here
    switch(results.length){

      // if there are 2 results
      case 2:
        if (userPoints < (minCount + interval)) {
          console.log(results[0]);
        } else {
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


  var displayResult = function() {

    console.log(userResult);

    $resultDiv = $(".result").text(userResult);

    $resultDiv.show();



  }; // closes displayResult function







  // $(".q1 .option").click(function() {
  //   // console.log($(".q1 > div.selected").length);

  //   // remove class if it exists
  //   $(".q1 .option").removeClass("selected");

  //   // console.log($(this));

  //   // add .selected class to clicked element
  //   $selectedOption = $(this);
  //   $selectedOption.addClass("selected");
  // })








}); // closes document.ready