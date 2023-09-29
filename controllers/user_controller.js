const User = require("../models/User");

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/reviews");
    }

    return res.render("user_sign_up", {
        title: "Sign up",
    });
};

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/reviews");
    }

    return res.render("user_sign_in", {
        title: "Sign In",
    });
};

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash("error", "Passwords do not match!!");
            return res.redirect("back");
        }
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            // if user not found then create the user
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type: "employee",
            });
            console.log('user created');
            req.flash("success", "Signed up successfully. Login to continue");
            return res.redirect("/users/sign-in");
        } else {
            // user found
            req.flash("error", "User with this email already exists!");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error);
        req.flash("error", error);
        return res.redirect("back");
    }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash("success", "Logged In successfully!!");
    return res.redirect("/reviews");
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have logged out!");
        return res.redirect("/");
    });
};
