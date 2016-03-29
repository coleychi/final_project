$(document).ready(function() { 

  maxOptions = 8; // sets maximum options per question
  minOptions = 2; // sets minimum options per question
  maxQuestions = 10; // sets maximum questions per quiz
  minResults = 2;
  maxResults = 6;
  currentPageNum = 1; // current page

  isValid = null;

  $(".results").hide(); // do this in css

  // need callback
  // var validateForm = function() {
  //   var isValid = true;

  //   // ensure all formFields are filled
  //   var $allInputFields = $("input")
  //   console.log($allInputFields);

  //   $allInputFields.each(function() {
  //     // console.log($(this).val() === "")
  //     if ($(this).val() === "") {
  //       return isValid = false;
  //     }
  //   });
  //   return isValid = true;
  // }


  // go to next page
  $(document).on("click", "#next-page", function(event) {

    event.preventDefault();

    // nextPage();

    var nextPageNum = currentPageNum + 1;
    // console.log(nextPageNum); // confirms addition is correct

    $currentPage = $(".page-" + currentPageNum); // selects current page div
    $nextPage = $(".page-" + nextPageNum); // selects next page div

    // validateForm(); // need callback

    // // need callback
    // var $allInputFields = $("input");
    
    // console.log($allInputFields);

    // $allInputFields.each(function() {
    //   console.log($(this).val())
    //   console.log("evaluate: ", $(this).val() === "")
    //   if ($(this).val() === "") {
    //     return isValid = false;
    //   }
    //   return isValid = true;
    // });

    // if(isValid) {

      // hide current page
      $currentPage.hide();
      // $(".page-" + pageNum).hide();

      // remove #next-page button from DOM
      $nextPageButton = $("#next-page.q1");
      $nextPageButton.remove();



      console.log(isValid)
      // console.log(isValid)

      // if nextPage is less than maxQuestions limit, generate new question field
      if (nextPageNum <= maxQuestions) {

        // if the next page exists, show the page
        if ($nextPage.length) {
          console.log("it exists");
          $nextPage.show();

          currentPageNum = nextPageNum; // change the page number

        // if the next page does not exist, create it
        } else {
          console.log("create it");

          // remove .active class from current page's question
          $("#q" + currentPageNum).removeClass("active");

          // create page div
          // $nextPageDiv = $("<div></div>"); // creates div tags
          // $nextPageDiv.attr({
          //   class: "page-" + nextPageNum
          // }); // sets attributes
          // $nextPageDiv.insertAfter($currentPage); // add to page

          $nextPageDiv = $("<div></div>").attr({
            class: "page-" + nextPageNum
          }).insertAfter($currentPage);

          currentPageNum = nextPageNum; // change the page number

          addQuestion();

        }; // closes if else statement

      }; // closes if nextPageNum <= maxQuestions

    // } else {
    //   alert("fill all inputs");
    // }; // closes if isValid

  }); // closes #next-page click function


  // go to previous page -- THIS NEEDS TO BE RE-WRITTEN/RE-FACTORED
  $(document).on("click", "#prev-page", function(event) {

    event.preventDefault();

    console.log("currentPage ", currentPageNum);

    var prevPageNum = currentPageNum - 1;

    console.log(prevPageNum);

    $currentPage = $(".page-" + currentPageNum);
    $prevPage = $(".page-" + prevPageNum);

    $currentPage.hide(); // hide current page
    $prevPage.show(); // show previous page

    currentPageNum = prevPageNum; // change the page number
    
  }); // closes #prev-page click function


  // add a new question
  var addQuestion = function() {

    console.log(currentPageNum); // confirms page number is correct

    $pageDiv = $(".page-" + currentPageNum);

    var qNum = currentPageNum;

    // create div to contain question text and options for next question
    var $questionContainer = $("<div></div>");
    $questionContainer.attr({
      id: "q" + qNum,
      class: "q" + qNum
    });
    console.log($questionContainer); // confirms div created correctly
    $questionContainer.appendTo($pageDiv);
    $questionContainer.addClass("active"); // adds .active class to div

    // create input for question text
    $newQuestion = $("<input>");
    $newQuestion.attr({
      type: "text",
      name: "question-" + qNum,
      class: "q" + qNum,
      placeholder: "question " + qNum
    });
    $newQuestion.appendTo($questionContainer); // appends to page

    // create div for options
    $optsDiv = $("<div></div>");
    $optsDiv.attr({
      id: "q" + qNum + "opts",
      class: "q" + qNum
    });
    $optsDiv.appendTo($questionContainer); // appends to page

    // adds option input based on minOption value
    for (var i = 1; i < (minOptions + 1); i++) {
      $newInput = $("<input>"); // creates input

      $newInput.attr({
        type: "text",
        name: "q" + qNum + "opt" + i,
        class: "q" + qNum,
        placeholder: "option " + i
      }); // sets attributes 
      $newInput.appendTo($optsDiv); // appends to page
    }; // closes for loop 

    // create #add-option button
    $addOptionButton = $("<button>Add Option</button>");
    $addOptionButton.attr({
      id: "add-option",
      class: "q" + qNum
    });
    $addOptionButton.insertAfter($optsDiv);


    // these buttons prob need to be moved to a better place
    $newNextButton = $("<button id='next-page'>Next Page</button>");
    $newNextButton.insertAfter($addOptionButton);

    $newPrevButton = $("<button id='prev-page'>Prev Page</button>");
    $newPrevButton.insertAfter($addOptionButton);

  }; // closes addQuestion function


  // add options
  $(document).on("click", "#add-option", function() {

    event.preventDefault();

    console.log("current page ", currentPageNum);

    $optionsDiv = $("#q" + currentPageNum + "opts");
    var optCount = ($("#q" + currentPageNum + "opts > input").length)
    console.log(optCount);

    if (optCount < maxOptions) {

      $newInput = $("<input>");
      $newInput.attr({
        type: "text",
        name: "q" + currentPageNum + "opt" + (optCount + 1),
        class: "q" + currentPageNum,
        placeholder: "option " + (optCount + 1)
      });

      $newInput.appendTo($optionsDiv);

    }; // closes if optCount < maxOptions

  }); // closes #add-input click function


  // add results
  $(document).on("click", "#add-results", function() {

    event.preventDefault();

    // hide current page
    console.log(currentPageNum); // confirms currentPageNum var accessible

    $currentPage = $(".page-" + currentPageNum);
    $currentPage.hide();

    $("#next-page").remove();
    $("#add-results").hide();

    // show results div
    $resultsDiv = $(".results");
    $resultsDiv.show();


    for (var i = 1; i < minResults + 1; i++) {

      $resultInput = $("<input>");
      $resultInput.attr({
        type: "text",
        name: "result" + i,
        placeholder: "result " + i
      });

      $resultInput.appendTo($resultsDiv);

    }; // closes for loop 

    $addResultButton = $("<button>Add Result</button>");
    $addResultButton.attr({
      id: "add-result-field"
    })
    $addResultButton.appendTo($resultsDiv)


    // submit button
    $submitButton = $("<button>Submit</button>");
    $submitButton.attr({
      id: "submit-quiz"
    })
    $submitButton.appendTo($resultsDiv)


  }); // closes #add-results function


  $(document).on("click", "#add-result-field", function() {

    event.preventDefault();
    console.log("test");

    $resultsDiv = $(".results");

    var resultsCount = $(".results > input").length;
    console.log(resultsCount);

    if (resultsCount < maxResults) {

      $newInput = $("<input>");
      $newInput.attr({
        type: "text",
        name: "result" + (resultsCount + 1),
        placeholder: "result " + (resultsCount + 1)
      });

      $newInput.insertBefore("#add-result-field");

    }; // closes if resultsCount < maxResults

  }); // closes #add-result-field




}); // closes document.ready