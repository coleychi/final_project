// only if user is owner of profile
$(document).ready(function() {

  var clicked = false;

  $userInfoContainer = $(".user-info-container")
  var userData = {};

  // get user data from server
  $.ajax({
    url: "../getjson/userdata",
    method: "GET"
    // success function
    }).then(function(data) {
      console.log(data);
      userData = data;

    // error function
    }, function(error) {
      console.log("error: ", error)
  });


  $(document).on("click", "#edit-profile", function(event) {

    if (clicked == false) {

    console.log("editing my profile");
    console.log(userData); // confirms userData accessible

    $message = $("<p></p>").text("I think it'd be nice if you could edit your profile too.").appendTo(".prof-content")

    // hide user info
    // $(".user-info-container").hide();

    // create edit form
    // $editUserForm = $("<form></form>").attr({
    //   id: "edit-profile-form"
    // }).prependTo("#content-container");

    // toggle clicked
    clicked = true;

    } else if (clicked === true) {

      $message.hide();

      // toggle clicked
      clicked = false


    }

  });


  // hover-- does not work if user clicks quizzes and returns back to results
  $(".result-block").hover(function() {
    $(".hover-overlay", this).show();

  }, function() {
    $(".hover-overlay", this).hide();
  })

}); // closes document ready