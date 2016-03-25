window.onload = function() {

  $optionClass = $(".q1opt");

  console.log($optionClass);

  // $lastInputOption = $(".q1opt input").last();

  // console.log($lastInputOption);

  // $inputName = $lastInputOption.attr("name");

  // console.log($inputName)




  $("#add-new").click(function(event) {

    $lastInputOption = $(".q1opt input").last();

    // console.log($lastInputOption);

    $inputName = $lastInputOption.attr("name");

    optionNumber = $inputName.replace(/[^0-9]/g, "");

    console.log(optionNumber)

    // console.log(next)

    var add = parseInt(optionNumber) + 1

    console.log(add)

    var newInput = $("<input type='text' name='opt" + add + "' class='q1'> <br>");

    // append to div option class
    // $(newInput).appendTo(".q1opt");
    $(newInput).appendTo($optionClass);

  }); // closes click function





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


};