$(document).ready(function() {

  // facebook sharing configuration
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1754398674789796', // abstract this out?
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


  // click event to share -- customize
  $("#facebook-share").click(function() {

    FB.ui({
    display: 'popup',
    method: 'share',
    href: 'http://buzzfeed.com/',
    }, function(response){});

  })


  // twitter
  window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
  }(document, "script", "twitter-wjs"));


  // anchor tag to share-- customize
  $tweetLink = $("<a></a>").attr({
    href: "https://twitter.com/intent/tweet?url=YOURURLHERE&text=YOURPOSTTITLEHERE&via=YOURTWITTERNAMEHERE"
  })

  $("#twitter-share").wrap($tweetLink)




});



