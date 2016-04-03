$(document).ready(function() { 

  maxOptions = 8; // sets maximum options per question
  minOptions = 2; // sets minimum options per question
  maxQuestions = 10; // sets maximum questions per quiz

  // go to next page
  $(document).on("click", "#next-page", function(event) {

    event.preventDefault();

    var pageNumber = 1; // current page

    $prevPage = $(".page-" + pageNumber);

    // hide current page
    $(".page-" + pageNumber).hide();

    // remove add question button
    $nextPageButton = $("#next-page");
    $nextPageButton.remove();

    addQuestion();

    // // create next question
    // // access div that contains active question
    // var $active = $(".active"); 

    // // remove .active class from former active question
    // $active.removeClass("active");
    // // console.log($active); // confirms div selected

    // // access prev question number using its class
    // var prevQuestNum = parseInt($active.attr("class").replace(/[^0-9]/g, ""));
    // // console.log(prevQuestNum);

    // // add one for next question number
    // var nextQuestNum = prevQuestNum + 1;
    // // console.log(newQuestNum);

    // // create new "page" to contain question and its options
    // var $nextPage = $("<div></div>");
    // $nextPage.attr({
    //   class: "page-" + nextQuestNum
    // });
    // // console.log($nextPage); // confirms div created correctly
    // $nextPage.insertAfter($prevPage); // appends div to page

    // create div to contain question text and options for next question
    var $nextQuestion = $("<div></div>");
    $nextQuestion.attr({
      id: "q" + nextQuestNum,
      class: "q" + nextQuestNum
    });
    console.log($nextQuestion); // confirms div created correctly
    $nextQuestion.appendTo($nextPage);

    // add .active class to $nextQuestion
    $nextQuestion.addClass("active");

    // create input for question text
    $newQuestion = $("<input>");
    $newQuestion.attr({
      type: "text",
      name: "question-" + nextQuestNum,
      class: "q" + nextQuestNum,
      placeholder: "question"
    });
    $newQuestion.appendTo($nextQuestion); // appends to page

    // create div for options
    $newOptDiv = $("<div></div>");
    $newOptDiv.attr({
      id: "q" + nextQuestNum + "opts",
      class: "q" + nextQuestNum
    });
    $newOptDiv.appendTo($nextQuestion); // appends to page

    // adds option input based on minOption value
    for (var i = 1; i < (minOptions + 1); i++) {
      $newInput = $("<input>"); // creates input

      $newInput.attr({
        type: "text",
        name: "q" + nextQuestNum + "opt" + i,
        class: "q" + nextQuestNum,
        placeholder: "option " + i
      }); // sets attributes 
      $newInput.appendTo($newOptDiv); // appends to page
    };

    console.log($addQuestionButton);

    $addQuestionButton.appendTo($newOptDiv)

    

  });


  // // go to next page
  // $(document).on("click", "#add-question", function(event) {

  //   event.preventDefault();

  //   // remove add question button
  //   $addQuestionButton = $("#add-question");
  //   $addQuestionButton.remove();

  //   var pageNumber = 1; // current page

  //   $prevPage = $(".page-" + pageNumber);

  //   // hide current page
  //   $(".page-" + pageNumber).hide();

  //   addQuestion();

  //   // // create next question
  //   // // access div that contains active question
  //   // var $active = $(".active"); 

  //   // // remove .active class from former active question
  //   // $active.removeClass("active");
  //   // // console.log($active); // confirms div selected

  //   // // access prev question number using its class
  //   // var prevQuestNum = parseInt($active.attr("class").replace(/[^0-9]/g, ""));
  //   // // console.log(prevQuestNum);

  //   // // add one for next question number
  //   // var nextQuestNum = prevQuestNum + 1;
  //   // // console.log(newQuestNum);

  //   // // create new "page" to contain question and its options
  //   // var $nextPage = $("<div></div>");
  //   // $nextPage.attr({
  //   //   class: "page-" + nextQuestNum
  //   // });
  //   // // console.log($nextPage); // confirms div created correctly
  //   // $nextPage.insertAfter($prevPage); // appends div to page

  //   // // create div to contain question text and options for next question
  //   // var $nextQuestion = $("<div></div>");
  //   // $nextQuestion.attr({
  //   //   id: "q" + nextQuestNum,
  //   //   class: "q" + nextQuestNum
  //   // });
  //   // console.log($nextQuestion); // confirms div created correctly
  //   // $nextQuestion.appendTo($nextPage);

  //   // // add .active class to $nextQuestion
  //   // $nextQuestion.addClass("active");

  //   // // create input for question text
  //   // $newQuestion = $("<input>");
  //   // $newQuestion.attr({
  //   //   type: "text",
  //   //   name: "question-" + nextQuestNum,
  //   //   class: "q" + nextQuestNum,
  //   //   placeholder: "question"
  //   // });
  //   // $newQuestion.appendTo($nextQuestion); // appends to page

  //   // // create div for options
  //   // $newOptDiv = $("<div></div>");
  //   // $newOptDiv.attr({
  //   //   id: "q" + nextQuestNum + "opts",
  //   //   class: "q" + nextQuestNum
  //   // });
  //   // $newOptDiv.appendTo($nextQuestion); // appends to page

  //   // // adds option input based on minOption value
  //   // for (var i = 1; i < (minOptions + 1); i++) {
  //   //   $newInput = $("<input>"); // creates input

  //   //   $newInput.attr({
  //   //     type: "text",
  //   //     name: "q" + nextQuestNum + "opt" + i,
  //   //     class: "q" + nextQuestNum,
  //   //     placeholder: "option " + i
  //   //   }); // sets attributes 
  //   //   $newInput.appendTo($newOptDiv); // appends to page
  //   // };

  //   // console.log($addQuestionButton);

  //   // $addQuestionButton.appendTo($newOptDiv)

    

  // });


  // add question
  // add another question to quiz
  // $(document).on("click", "#add-question", function(event) {
  var addQuestion = function() {
    event.preventDefault();

    // remove add question button
    $addQuestionButton = $("#add-question");
    $addQuestionButton.remove();

    var pageNumber = 1; // current page

    $prevPage = $(".page-" + pageNumber);

    // hide current page
    $(".page-" + pageNumber).hide();

    // create next question
    // access div that contains active question
    var $active = $(".active"); 

    // remove .active class from former active question
    $active.removeClass("active");
    // console.log($active); // confirms div selected

    // access prev question number using its class
    var prevQuestNum = parseInt($active.attr("class").replace(/[^0-9]/g, ""));
    // console.log(prevQuestNum);

    // add one for next question number
    var nextQuestNum = prevQuestNum + 1;
    // console.log(newQuestNum);

    // create new "page" to contain question and its options
    var $nextPage = $("<div></div>");
    $nextPage.attr({
      class: "page-" + nextQuestNum
    });
    // console.log($nextPage); // confirms div created correctly
    $nextPage.insertAfter($prevPage); // appends div to page

    // create div to contain question text and options for next question
    var $nextQuestion = $("<div></div>");
    $nextQuestion.attr({
      id: "q" + nextQuestNum,
      class: "q" + nextQuestNum
    });
    console.log($nextQuestion); // confirms div created correctly
    $nextQuestion.appendTo($nextPage);

    // add .active class to $nextQuestion
    $nextQuestion.addClass("active");

    // create input for question text
    $newQuestion = $("<input>");
    $newQuestion.attr({
      type: "text",
      name: "question-" + nextQuestNum,
      class: "q" + nextQuestNum,
      placeholder: "question"
    });
    $newQuestion.appendTo($nextQuestion); // appends to page

    // create div for options
    $newOptDiv = $("<div></div>");
    $newOptDiv.attr({
      id: "q" + nextQuestNum + "opts",
      class: "q" + nextQuestNum
    });
    $newOptDiv.appendTo($nextQuestion); // appends to page

    // adds option input based on minOption value
    for (var i = 1; i < (minOptions + 1); i++) {
      $newInput = $("<input>"); // creates input

      $newInput.attr({
        type: "text",
        name: "q" + nextQuestNum + "opt" + i,
        class: "q" + nextQuestNum,
        placeholder: "option " + i
      }); // sets attributes 
      $newInput.appendTo($newOptDiv); // appends to page

    }; // closes for loop

    console.log($addQuestionButton);

    $addQuestionButton.appendTo($newOptDiv)


  };



}); // closes document.ready