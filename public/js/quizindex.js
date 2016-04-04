$(document).ready(function() { 

  var incr = 5; // number of quizzes that display 

  var rowCount = $(".row").length; // total number of quizzes to load
  var displayed = null; // number of quizzes currently displayed
  console.log("row count: ", rowCount);
  console.log("displayed count: ", displayed);

  // $("#content-container .row:lt(" + incr + ")");
  $("#content-container .row:lt(" + incr + ")").removeClass("hide"); // show first incr by default

  $("#load-more").on("click", function() {
    incr += incr;
    $("#content-container .row:lt(" + incr + ")").removeClass("hide");
  });

  // hide button if number of results is less than increment-- this needs to be tested when there are
  // more quizzes
  // if (rowCount < incr) {
  //   $("#load-more").hide();
  // }

});