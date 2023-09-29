const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("../models/User");

// authentication using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        function (req, email, password, done) {
            // find an user and establish the identity
            User.findOne({ email: email })
                .then((user) => {
                    if (!user || user.password != password) {
                        req.flash("error", "Invaild Username/Password");
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    req.flash("error", err);
                    return done(err);
                });
        }
    )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => {
        return done(null, user);
    }).catch(err=> {
        console.log("Error in finding user --> Passport");
        return done(err);
    });
});

// check if the user is authenticated
passport.isAuthenticated = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect("/users/sign-in");
};

// check if the user is not authenticated
// passport.isNotAuthenticated = function(req, res, next){
//     // if the user is signed in, then pass on the request to the next function(controller's action)
//     if (!req.isAuthenticated()){
//         return next();
//     }

//     // if the user is not signed in
//     return res.redirect('/users/sign-in');
// }

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
};

module.exports = passport;
