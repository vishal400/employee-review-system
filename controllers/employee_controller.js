const User = require("../models/User");

// homepage for employees
module.exports.getEmployees = async function (req, res) {
    try {
        const users = await User.find({});

        if (users) {
            return res.render("employees", {
                users: users,
                error: false,
            });
        } else {
            return res.render("employees", {
                error: "No employees found",
            });
        }
    } catch (error) {
        return res.render("employees", {
            error: "Unable to find employees. Please try again later",
        });
    }
};

// update user
module.exports.update = async function (req, res) {
    try {
        // get the id of the user from params
        const id = req.params.id;
        const update = req.body;
        await User.findByIdAndUpdate(id, update);

        req.flash("success", "Employee updated successfully!");
        return res.redirect("back");
    } catch (error) {
        req.flash("error", error);
        return res.redirect("back");
    }
};

// delete user
module.exports.delete = async function (req, res) {
    try {
        // if user is not an admin they cannot delete the user
        if (req.user.type != "admin") {
            req.flash(
                "error",
                "You are not authorized to remove the employee!"
            );
            return res.redirect("back");
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            req.flash("error", "Employee with this user id not found!");
            return res.redirect("back");
        }
        req.flash("success", "Employee deleted successfully!");
        return res.redirect("back");
    } catch (error) {
        req.flash("success", error);
        return res.redirect("back");
    }
};

// update type of the employee
module.exports.updateType = async function (req, res) {
    try {
        // get the id of the user from params
        const id = req.params.id;
        const user = await User.findById(id);

        // change the type
        if (user.type === "admin") {
            user.type = "employee";
        } else {
            user.type = "admin";
        }

        // save
        await user.save();

        req.flash("success", "Updated the type of the employee!");
        return res.redirect("back");
    } catch (error) {
        req.flash("error", error);
        return res.redirect("back");
    }
};
