$(document).ready(function() {

  // access quiz id number
  // var pathname = window.location.pathname;
  // var newPath = pathname.replace("/quizzes/", "");
  // console.log(pathname)
  // console.log(newPath)

  // grab quiz id using window location
  var quizId = window.location.pathname.replace("/quizzes/", "");
  console.log(quizId); // confirms quiz id accessed
  var quizData = {};

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

    // error function
    }, function(error) {
      console.log("error: ", error);
  });


  // success callback for ajax call
  var onSuccess = function(data) {
    // console.log("success callback: ", data);

    // console.log(quizData)

    console.log(quizData.questions.length);

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
    }; // closes if statement

    }; // closes return function

  }; // closes clickEvent







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