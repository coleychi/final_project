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






}); // closes document.ready