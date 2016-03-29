$(document).ready(function() {

  $("#signup").click(function() {
    // console.log("clicked");
    generatePopup();

    generateSignup();

    // // create login form and append to popup 
    // $loginForm = $("<form></form>").attr({
    //   action: "../users/signup",
    //   method: "POST",
    //   class: "auth-form"
    //   }).insertBefore($cancelButton)

    // // generate input fields
    // $usernameInput = $("<input>").attr({
    //   type: "text",
    //   name: "username",
    //   placeholder: "username"
    //   }).appendTo($loginForm);

    // $emailInput = $("<input>").attr({
    //   type: "text",
    //   name: "email",
    //   placeholder: "email"
    //   }).appendTo($loginForm);

    // $passwordInput = $("<input>").attr({
    //   type: "password",
    //   name: "password",
    //   placeholder: "password"
    //   }).appendTo($loginForm)

    // // generate submit button
    // $submitInput = $("<input>").attr({
    //   type: "submit",
    //   name: "submit"
    //   }).appendTo($loginForm)

  });

  // generate signup form
  var generateSignup = function() {
    // create login form and append to popup 
    $signupForm = $("<form></form>").attr({
      action: "../users/signup",
      method: "POST",
      class: "auth-form"
      }).insertBefore($cancelButton);

    $signupText = $("<h4>Signup</h4>").appendTo($signupForm);

    // generate input fields
    $usernameInput = $("<input>").attr({
      type: "text",
      name: "username",
      placeholder: "username"
      }).appendTo($signupForm);

    $emailInput = $("<input>").attr({
      type: "text",
      name: "email",
      placeholder: "email"
      }).appendTo($signupForm);

    $passwordInput = $("<input>").attr({
      type: "password",
      name: "password",
      placeholder: "password"
      }).appendTo($signupForm)

    // generate submit button
    $submitInput = $("<input>").attr({
      type: "submit",
      name: "sign up",
      value: "Sign up"
      }).appendTo($signupForm)
  }

  // generate login form
  var generateLogin = function() {
    // create login form and append to popup 
    $loginForm = $("<form></form>").attr({
      action: "../users/login",
      method: "POST",
      class: "auth-form"
      }).insertBefore($cancelButton);

    $loginText = $("<h4>Login</h4>").appendTo($loginForm);

    // generate input fields
    $usernameInput = $("<input>").attr({
      type: "text",
      name: "username",
      placeholder: "username"
      }).appendTo($loginForm);

    $passwordInput = $("<input>").attr({
      type: "password",
      name: "password",
      placeholder: "password"
      }).appendTo($loginForm)

    // generate submit button
    $submitInput = $("<input>").attr({
      type: "submit",
      name: "log in",
      value: "Log in"
      }).appendTo($loginForm)
  };


  $("#login").click(function() {
    // console.log("clicked");
    generatePopup();

    generateLogin();
    // // create login form and append to popup 
    // $loginForm = $("<form></form>").attr({
    //   action: "../users/login",
    //   method: "POST",
    //   class: "auth-form"
    //   }).insertBefore($cancelButton);

    // // generate input fields
    // $usernameInput = $("<input>").attr({
    //   type: "text",
    //   name: "username",
    //   placeholder: "username"
    //   }).appendTo($loginForm);

    // $passwordInput = $("<input>").attr({
    //   type: "password",
    //   name: "password",
    //   placeholder: "password"
    //   }).appendTo($loginForm)

    // // generate submit button
    // $submitInput = $("<input>").attr({
    //   type: "submit",
    //   name: "submit"
    //   }).appendTo($loginForm)

  });


  var generatePopup = function() {
    // create blackout
    $blackoutDiv = $("<div></div>").addClass("blackout");
    // console.log($("body"));
    $("body").prepend($blackoutDiv).hide().fadeIn();

    // create popup
    $popupDiv = $("<div></div>").addClass("popup");
    // $popupDiv.addClass("popup");
    $popupDiv.insertAfter($blackoutDiv);

    $cancelButton = $("<i></i>").attr({
      id: "closePopup"
    }).text("x");

    $cancelButton.appendTo($popupDiv)

  };

  // close form when button is clicked
  $(document).on("click", "#closePopup", function() {
    closeForm();
  });


  var closeForm = function() {

    $blackoutDiv.remove();
    $popupDiv.remove();

  }


}); // closes document ready






  // // create blackout
  // $blackoutDiv = $("<div></div>");
  // $blackoutDiv.addClass("blackout");
  // console.log($("body"));
  // $("body").prepend($blackoutDiv);

  // // create popup
  // $popupDiv = $("<div></div>");
  // $popupDiv.addClass("popup");
  // $popupDiv.insertAfter($blackoutDiv);

    // // create sign in form
  // $signInForm = $("<form></form>");
  // $signInForm.attr({
  //   action: "../users/login",
  //   method: "POST",
  //   class: "auth-form"
  // });

  // $signInForm.appendTo($popupDiv);

  // $usernameInput = $("<input>");
  // $usernameInput.attr({
  //   type: "text",
  //   name: "username"
  // });

  // $passwordInput = $("<input>");
  // $passwordInput.attr({
  //   type: "password",
  //   name: "password"
  // });

  // $usernameInput.appendTo($signInForm);
  // $passwordInput.appendTo($signInForm);

  // $submitInput = $("<input>");
  // $submitInput.attr({
  //   type: "submit",
  //   name: "submit"
  // })

  // $submitInput.appendTo($signInForm)

