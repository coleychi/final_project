window.onload = function() {
  console.log("test");

  // listens for change in input
  (function() {
      // fileInput = document.getElementById("file-input");
      // console.log("file input:", fileInput)
      document.getElementById("file-input").onchange = function(){
        console.log("user inputted a file")
          var files = document.getElementById("file-input").files;
          var file = files[0];
          if(file == null){
              alert("No file selected.");
          }
          else{
              get_signed_request(file);
          }
      };
  })();


  // accepts file object and retrieves signed request
  function get_signed_request(file){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/quizzes/sign_s3?file_name="+file.name+"&file_type="+file.type);
      xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  var response = JSON.parse(xhr.responseText);
                  upload_file(file, response.signed_request, response.url);
              }
              else{
                  alert("Could not get signed URL.");
              }
          }
      };
      xhr.send();
  }


  // accepts file to be uploaded
  function upload_file(file, signed_request, url){
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
          if (xhr.status === 200) {
              document.getElementById("preview").src = url;
              document.getElementById("avatar_url").value = url;
          }
      };
      xhr.onerror = function() {
          alert("Could not upload file.");
      };
      xhr.send(file);
  }







}; // closes onload