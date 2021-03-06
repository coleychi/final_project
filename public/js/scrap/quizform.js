$(document).ready(function() { 

  // console.log("new quiz")

  // SETTINGS
  maxOptions = 9; // sets maximum options per question
  minOptions = 3; // sets minimum options per question
  maxQuestions = 10; // sets maximum questions per quiz
  minResults = 2;
  maxResults = 6;
  currentPageNum = 1; // current page starts at 1
  resultCount = 1; // result count starts at 1

  isValid = null;

  // grab hint text and save
  var hintText = $(".hint").text();
  console.log(hintText);


  // selects all inputs for question
  // input = $("input.q1")
  // console.log(input);


  var validateInput = function() {

    // console.log(currentPageNum);

    // // select inputs for question
    input = $("input.q" + currentPageNum).toArray()
    console.log(input)

    $("input.q" + currentPageNum).each(function() {

      if (this.value == "") {
        console.log("no input")
        stuffDone = true;
        return false
      }

      console.log("got here");


    })

  }





  // go to next page
  $(document).on("click", "#next-page", function(event) {

    event.preventDefault();

  //   var canContinue = false;

  //   // select inputs for question
  //   input = $("input.q" + currentPageNum).toArray()
  //   console.log(input)

  //   $("input.q" + currentPageNum).each(function() {

  //     if (this.value == "") {
  //       console.log("no input")
  //       return
  //     }
  //     else canContinue = true;
  //     console.log("got here");

  //   });

  // if (canContinue === true) {

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

      // // hide current page
      // $currentPage.hide();
      // $(".page-" + pageNum).hide();

      // remove #next-page button from DOM

      if (!$currentPage === 1) {
        $nextPageButton = $("#next-page.q1");
        $nextPageButton.hide();
      }

      // console.log("")

      // console.log(isValid)
      console.log(isValid)

      // if nextPage is less than maxQuestions limit, generate new question div
      if (nextPageNum <= maxQuestions) {

        // hide current page
        $currentPage.hide();

        // if the next page already exists, show the page
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

          // create section
          $nextPageSection = $("<section></section>").attr({
            class: "page-" + nextPageNum
          }).insertAfter($currentPage);

          currentPageNum = nextPageNum; // change the page number

          // create header 
          $qHeader = $("<h3>Questions</h3>").appendTo($nextPageSection);

          // show hint div
          $hintDiv = $("<div class='hint'></div>").text(hintText).appendTo($nextPageSection);

          // create span to display question number
          $pageNumSpan = $("<span></span>").attr({
            class: "pageNum"
          }).text(currentPageNum).appendTo($nextPageSection);

          addQuestion();

        }; // closes if else statement

      }; // closes if nextPageNum <= maxQuestions

    // } else {
    //   alert("fill all inputs");
    // }; // closes if isValid

    // }; // closes can continue-- add else for an error?

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
    $newNextButton = $("<i class='fa fa-chevron-right next' id='next-page'></i>");
    $newNextButton.insertAfter($addOptionButton);

    $newPrevButton = $("<i class='fa fa-chevron-left prev' id='prev-page'></i>");
    $newPrevButton.insertAfter($addOptionButton);



    // these buttons prob need to be moved to a better place
    // $newNextButton = $("<button id='next-page'>Next Page</button>");
    // $newNextButton.insertAfter($addOptionButton);

    // $newPrevButton = $("<button id='prev-page'>Prev Page</button>");
    // $newPrevButton.insertAfter($addOptionButton);

  }; // closes addQuestion function



  // add options
  $(document).on("click", "#add-option", function() {

    event.preventDefault();


    console.log("current page ", currentPageNum);

    $optionsDiv = $("#q" + currentPageNum + "opts");
    var optCount = ($("#q" + currentPageNum + "opts > input").length); // number of option input fields in question
    console.log(optCount);

    // check that current option count is less than max options
    if (optCount < maxOptions) {

      $newInput = $("<input>");
      $newInput.attr({
        type: "text",
        name: "q" + currentPageNum + "opt" + (optCount + 1),
        class: "q" + currentPageNum,
        placeholder: "option " + (optCount + 1)
      });

      $newInput.appendTo($optionsDiv);

      canContinue = false;

    } else {
      $("#add-option").hide();
    }; // closes if optCount < maxOptions

  }); // closes #add-input click function


  // add results
  var addResults = function() {

    $addResultButton = $("#add-result");

    // create div to contain all fields related to result
    $oneResultDiv = $("<div></div>").addClass("one-result");

    // create left-side div for title and img inputs
    $resultLeftDiv = $("<div></div>").addClass("result-left left").appendTo($oneResultDiv);

    // create right-side div for description textarea
    $resultRightDiv = $("<div></div>").addClass("result-right right").appendTo($oneResultDiv);

    // create input fields
    $titleInput = $("<input>");
    $titleInput.attr({
      type: "text",
      name: "result-" + resultCount,
      class: "r" + resultCount,
      placeholder: "result heading"
    });

    $imgInput = $("<input>");
    $imgInput.attr({
      type: "text",
      name: "res" + resultCount + "imgUrl",
      class: "r" + resultCount,
      placeholder: "img url"
    });

    $descriptionInput = $("<textarea></textarea>");
    $descriptionInput.attr({
        type: "text",
        name: "res" + resultCount + "description",
        class: "r" + resultCount,
        placeholder: "description"
    });


    $titleInput.appendTo($resultLeftDiv);
    $imgInput.appendTo($resultLeftDiv);
    $descriptionInput.appendTo($resultRightDiv);

    // $oneResultDiv.appendTo(".results");

    $oneResultDiv.insertBefore($addResultButton);

    // create result label span
    $resultLabelSpan = $("<span></span>").addClass("result-label").text("Result " + resultCount);

    $resultLabelSpan.insertBefore($oneResultDiv);

    // add hr
    if (resultCount > 1) {
      $hrBreak = $("<hr>");
      $hrBreak.insertBefore($resultLabelSpan)
    }

    // update result count
    resultCount = resultCount + 1;

  }; // closes addResults function


  // add min result fields
  for (var i = 0; i < minResults; i++) {
    addResults();
  };


  $(document).on("click", "#add-result", function() {

    event.preventDefault();

    // console.log("sup");

    // create new result field if count does not exceed max
    if (resultCount <= maxResults) {
      addResults();
    };

  }); // closes #add-option click function


}); // closes document.ready


