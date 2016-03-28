window.onload = function() {

  var formData = {
  "title": "New quiz",
  "description": "description",
  "imgUrl": "img",
  "question-1": "what ice cream do you like",
  "q1opt1": "vanilla",
  "q1opt2": "chocolate",
  "q1opt3": "strawberry",
  "question-2": "what is something",
  "q2opt1": "option 1",
  "q2opt2": "question 2, option 2",
  "q2opt3": "question 2, option 3",
  "question-3": "question 3",
  "q3opt1": "question 3, option 1",
  "q3opt2": "question 3, option 2",
  "result1": "Vanilla",
  "result2": "Chocolate"
  }

  // console.log(formData);

  // create array of keys in object
  var keysArray = Object.keys(formData);
  // console.log(keysArray);


  // // for (var i = 0; i < keysArray.length; i++ ) {
  // //   keysArray[i] = keysArray[i].replace(/(q)(?=[0-9])/, "hi");
  // // }

  // // console.log(keysArray)




  // find number of questions
  var filterQuestionKeys = function(key) {
    return key.indexOf("question") > -1
  }

  // console.log(keysArray.filter(filterQuestionKeys))

  var questionKeys = keysArray.filter(filterQuestionKeys);

  var questionCount = questionKeys.length;

  console.log(questionCount); // number of questions

  var questionsArray = []; // array of question text

  var optionsArray = []; // array for options

  var num = 1; // set first question to 1


  for (var i = 0; i < questionKeys.length; i++) {

    var optionsArray = []; // clear options array

    var question = formData[questionKeys[i]];
    console.log("question num ", num)

    questionsArray.push(question);

    var filterOptionKeys = function(key) {
      return key.indexOf("q" + num) > -1;
    }

    var optionKeys = keysArray.filter(filterOptionKeys);

    console.log("option keys ", optionKeys);

    for (var j = 0; j < optionKeys.length; j++) {

      var option = formData[optionKeys[j]];
      optionsArray.push(option);

    }; // closes options array

    num = num + 1;


  } // closes for loop 

  console.log(questionsArray); 
  console.log(optionsArray)


}