// window.onload = function() {
  // console.log("hi")

  var calculatePoints = function() {

    // prevents form from submitting for testing purposes
    $("form").submit(function(event) {
      event.preventDefault();
    });

    console.log("testing response");

    $formData = $("form").serializeArray();

    console.log($formData);

    count = 0;
    result = "";

    for (var i = 0; i < $formData.length; i++) {
      value = parseInt($formData[i].value)

      count += value; 

    }; // closes for loop

    if (count === 0) {
      result = "result 1"
    } else if (count > 2) {
      result = "result 2"
    } else if (count > 3) {
      result = "result 3"
    } else {
      result = "result 4"
    }

    console.log(count)

    $("#results").text(result)

  }




// }