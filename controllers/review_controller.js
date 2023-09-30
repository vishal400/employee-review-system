const Review = require("../models/Review");
const User = require("../models/User");

// get assign work page
module.exports.assignWorkPage = async function (req, res) {
    const users = await User.find();
    return res.render("assign_work", {
        title: "Assign Work",
        users: users,
    });
};

// get reviews
module.exports.getReviews = async function (req, res) {
    try {
        const user = await User.findById(req.user)
            .populate({
                path: "assignedReviews",
                populate: {
                    path: "to",
                },
            })
            .populate({ path: "reviews", populate: { path: "from" } });

        const assignedReviews = user.assignedReviews;
        const reviews = user.reviews;
        const reviewWithMessages = reviews.filter((ele) => {
            if (ele.message && ele.message != "") {
                return true;
            }
            return false;
        });
        
        return res.render("reviews", {
            assignedReviews: assignedReviews,
            reviews: reviewWithMessages,
            title: "Reviews",
        });
    } catch (error) {
        console.log(error);
        req.flash("error", error);
        return res.redirect("back");
    }
};

// create review
module.exports.createReview = async function (req, res) {
    try {
        // if user making this request is not the admin
        // they don't have privilge to create review
        if (req.user.type != "admin") {
            req.flash(
                "error",
                `You don't have privilege. Only admins can assign work!!`
            );
            return res.redirect("back");
        }

        // check if both recipient and reciever are same
        if (req.body.from == req.body.to) {
            req.flash("error", "Recipient and Reciever cannot be same!");
            return res.redirect("back");
        }

        // check if review already exist
        const alreadyExist = await Review.findOne({
            from: req.body.from,
            to: req.body.to,
        });
        console.log(alreadyExist);
        if (alreadyExist) {
            req.flash("error", "Review already exist!");
            return res.redirect("back");
        }

        const review = await Review.create(req.body);

        // populate assigned reviews array for "from" user
        const fromUser = await User.findById(req.body.from);
        fromUser.assignedReviews.push(review);
        await fromUser.save();

        // populate assigned reviews array for "to" user
        const toUser = await User.findById(req.body.to);
        toUser.reviews.push(review);
        await toUser.save();

        req.flash("success", "Review created successfully!");
        return res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", error);
        return res.redirect("back");
    }
};

// complete review
module.exports.completeReview = async function (req, res) {
    try {
        if (req.body.message && req.body.message == "") {
            req.flash("error", "Message cannot be empty!");
            return redirect("back");
        }
        const review = await Review.findOneAndUpdate(
            { from: req.user, to: req.body.to },
            { message: req.body.message }
        );

        await User.findByIdAndUpdate(req.user, {
            $pull: { assignedReviews: review._id },
        });

        req.flash("success", "Review completed!");
        return res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", error);
        return res.redirect("back");
    }
};
