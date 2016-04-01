$(document).ready(function() { 



  var incr = 3; // number of quizzes that display 

  rowCount = $(".row").length;
  console.log(rowCount);

  $("#content-container .row:lt(" + 3 + ")");
  $("#content-container .row:lt(" + 3 + ")").removeClass("hide");

});