$(document).ready(function() { 



  var incr = 3; // number of quizzes that display 

  rowCount = $(".row").length;
  console.log(rowCount);

  // $("#content-container .row:lt(" + incr + ")");
  $("#content-container .row:lt(" + incr + ")").removeClass("hide");

  $("#load-more").on("click", function() {
    incr += incr;
    $("#content-container .row:lt(" + incr + ")").removeClass("hide");
  })

});