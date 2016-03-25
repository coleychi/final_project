var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/users.js");

// module.export the passport functionality
module.exports = function(passport) {

  // serialize user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // SIGNUP STRATEGY

  // database interaction
  passport.use("local-signup", new LocalStrategy({
    usernameField: "username", // passport default
    passwordField: "password",
    passReqToCallback: true // passes entire request to call back-- req.body accessible
  },

  function(req, username, password, done) {

    // wait for data to come back before executing
    process.nextTick(function() {

      // find user whose username matches that of the form
      // (checking to see if username exists)
      User.findOne({"username": username}, function(err, user) {

        // if there is an error, return the error
        if (err)
          return done(err);

        // check if there is a user with inputted username
        if (user) {
          return done(null, false);
        } else {

          // if there is no user with the username, create the user
          var newUser = new User();

          console.log("passport signup req.body: ", req.body);

          newUser.username = username;
          newUser.password = newUser.generateHash(password); // calls method inside user model
          newUser.email = req.body.email;

          // save user
          newUser.save(function(err) {
            if(err)
              throw err;
            return done(null, newUser)
          });

        };

      });

    });

  })); // closes signup strategy


  // LOGIN STRATEGY
  passport.use("local-login", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, username, password, done) {

    User.findOne({"username": username}, function(err, user) {

      // if there is an error, return error
      if (err) {
        return done(err);
      }

      // if username not found, return
      if (!user) {
        return done(null, false);
      }

      // if user found, but password does not match
      if (!user.validPassword(password)) {
        return done(null, false);
      }

      // if no problems, return user
      return done(null, user);

    });

  }));


}; // closes module.exports