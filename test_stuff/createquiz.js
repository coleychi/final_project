// window.onload = function() {
  $( document ).ready(function() {


  maxOptions = 8;

  $optionClass = $("#q1opt");

  $questionDiv = $("#q1");

  console.log($questionDiv);

  console.log($optionClass);

  // $lastInputOption = $(".q1opt input").last();

  // console.log($lastInputOption);

  // $inputName = $lastInputOption.attr("name");

  // console.log($inputName)

  // $lastInput = $(".last");
  // var className = $lastInput.attr("class");
  // console.log(className);
  // var questionNumber = parseInt(className.replace(/[^0-9]/g, ""));
  // console.log(questionNumber)
  // console.log($lastInput)


  // // add another input to option
  // $("#add-input").click(function(event) {

  //   $lastInput = $(".last");
  //   var className = $lastInput.attr("class");
  //   console.log(className);
  //   var questionNumber = parseInt(className.replace(/[^0-9]/g, ""));
  //   console.log(questionNumber)
  //   console.log($lastInput)

  //   $lastInputOption = $("#q" + questionNumber + "opt input").last();

  //   // $lastInputOption = $("#q1opt input").last();

  //   // console.log($lastInputOption);

  //   $inputName = $lastInputOption.attr("name");

  //   optionNumber = $inputName.replace(/[^0-9]/g, "");

  //   console.log(optionNumber);

  //   // console.log(next)

  //   var add = parseInt(optionNumber) + 1;

  //   console.log(add);

  //   // if options equals or exceeds maximum, hide the add button
  //   if (add >= maxOptions) {

  //     $(this).hide();

  //   }; // closes if statement

  //   var newInput = $("<input type='text' name='opt" + add + "' class='q1'> <br>");

  //   // append to div option class
  //   // $(newInput).appendTo(".q1opt");
  //   $(newInput).appendTo($optionClass);



  // }); // closes add-input click function


  // add another question
  $(document).on("click", "#add-question", function(){ 
  // $("#add-question").click(function(event) {

    // grab last question div
    var $last = $(".last");

    // access class of the last question
    lastClass = $last.attr("class").replace(/[^0-9]/g, "");

    // next question
    nextClassNumber = parseInt(lastClass) + 1;

    console.log(lastClass)

    console.log(nextClassNumber)

    // // remove last class from previous question
    // $last.removeClass("last");
    // console.log($last);

    // create div for next question
    var $nextQuestion = $("<div></div>");

    // set id and class
    $nextQuestion.attr({
      id: "q" + nextClassNumber,
      class: "q" + nextClassNumber
    });
    console.log($nextQuestion); // confirms div created correctly

    // append div to page
    $nextQuestion.insertAfter($last);

    // remove last class from previous last question
    $last.removeClass("last");

    // add last class to current question
    $nextQuestion.addClass("last");

    // remove add new option button
    // $("#add-input").hide();

    // create input for question
    $questionText = $("<input type='text'>");

    $nextQuestion.append($questionText);

    // add div for the options
    var $optionsDiv = $("<div></div>");

    // set id and class
    $optionsDiv.attr({
      id: "q" + nextClassNumber + "opt",
      class: "q" + nextClassNumber
    });
    console.log($optionsDiv); // confirms div created correctly

    // append div to page
    $optionsDiv.insertAfter($questionText);

    $newInput = $("<input type='text'>");

    $newInput.attr({
      name: "opt1",
      class: "q" + nextClassNumber
    })

    $newInput.appendTo($optionsDiv);

    // add new option button
    $insertOptionButton = $("<i>New Option</i>");

    $insertOptionButton.attr({
      id: "add-input",
      class: "q" + nextClassNumber
    })

    $insertOptionButton.insertAfter($optionsDiv);


  }); // closes add-question click function

  // $(document).on('click', '#add-input', function(){ 
  //    console.log("clicked document")
  // });

  // add another input to option
  $(document).on("click", "#add-input", function(){ 
  // $("#add-input").click(function(event) {

    $lastInput = $(".last");
    var className = $lastInput.attr("class");
    console.log(className);
    var questionNumber = parseInt(className.replace(/[^0-9]/g, ""));
    console.log(questionNumber);

    $optionClass = $("#q" + questionNumber + "opt");

    $lastInputOption = $("#q" + questionNumber + "opt input").last();

    // // $lastInputOption = $("#q1opt input").last();

    console.log($lastInputOption);

    $inputName = $lastInputOption.attr("name");

    optionNumber = $inputName.replace(/[^0-9]/g, "");

    console.log(optionNumber);

    // console.log(next)

    var add = parseInt(optionNumber) + 1;

    console.log(add);

    // if options equals or exceeds maximum, hide the add button
    if (add >= maxOptions) {

      $(this).hide();

    }; // closes if statement

    // var newInput = $("<input type='text' name='opt" + add + "' class='q1'> <br>");

    var newInput = $("<input type='text'>");

    newInput.attr({
      name: "opt" + add,
      class: "q" + questionNumber
    });

    // append to div option class
    // $(newInput).appendTo(".q1opt");
    $(newInput).appendTo($optionClass);



  }); // closes add-input click function

  











  // $form = $("#new-quiz");

  // console.log($form);

  // $newOption = $("#add-new");

  // console.log($newOption);

  // $lastChild = $(".q1").last();

  // // confirms last child is grabbed
  // $lastChild.addClass("highlight");

  // $lastInput = $lastChild; // save because it will no longer be the last child

  // // access the input name
  // var optionNumber = $lastChild.attr("name");

  // // access the class
  // var questionNumber = $lastChild.attr("class");

  // console.log(optionNumber);

  // console.log($lastChild);

  // $newOption.click(function() {

  //   optionNumber = optionNumber.replace(/[^0-9]/g, "");

  //   console.log(optionNumber);
  //   optionNumber = parseInt(optionNumber)

  //   optionNumber += 1;

  //   console.log(optionNumber);

  //   optionNumber = "opt" + optionNumber

  //   console.log(optionNumber)

  //   console.log("hello")
  //   $newInput = $("input").attr("name", optionNumber);

  //   console.log($newInput);

  //   $newInput.insertAfter($lastInput)

  // });


}); // closes window onload