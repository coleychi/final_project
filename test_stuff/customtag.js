$(document).ready(function() { 

  var questionTag = document.registerElement("question-tag");
  var $newQuestionTag = new questionTag()
  // $(document).$("body").append($newQuestionTag)
  // document.body.appendChild($newQuestionTag);

  var $container = $("#container");
  $container.append($newQuestionTag);

  $container.attr({
    class: "test",
    id: "something"
  })

  $newQuestionTag.attr("data-"+id, "something")




});