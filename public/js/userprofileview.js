$(document).ready(function() { 

  // save components as variables
  $contentContainer = $(".profile-content-container"); // accesses content-container
  $quizzesContent = $("#quizzes-content-container") // accesses quizzes content
  $resultsContent = $("#result-tiles-container"); // access results content

  // $quizzesContent.appendTo($contentContainer);

  // default to results --> hide quizzes
  $quizzesContent.hide();

  $(document).on("click", "#user-results", function(event) {
    // console.log("clicked results");

    // empty container
    $contentContainer.empty();

    // show results
    $resultsContent.appendTo($contentContainer);

    // update selected tab
    changeTab(this);
    
  });


  $(document).on("click", "#user-quizzes", function(event) {

    // console.log("clicked quizzes");

    // empty container
    $contentContainer.empty();

    // show quizzes
    $quizzesContent.appendTo($contentContainer).show();

    // update selected tab
    changeTab(this);

  });


  // change active tab
  var changeTab = function(element) {

    // console.log(element); // no longer jquery element
    // console.log($("ul.tabs li"));

    // remove selected class
    $("ul.tabs li").removeClass("selected");

    // add selected class to current tab
    element.classList.add("selected");

  }; // closes change tab


  // creates click events for options --> add hover event to each result
  var renderQuiz = function() {

    $("#quiz-container").removeClass("hide"); // display quiz
    console.log(quizData.questions.length); // confirming quizData accessible

    // for each question, attach click event to options
    for (var i = 1; i < (quizData.questions.length + 1); i++) {

      $(".q-" + i + " .option").click(clickEvent(i)); // jquery selector needs to be equal to the quiz parent

    }; // closes for loop 

  }; // closes renderQuiz

  // clickEvent attached to each option --> create the hover event
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




}); // closes document.ready