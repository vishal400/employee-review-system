const Review = require('../models/Review');
const User = require('../models/User');

// create review
module.exports.createReview = async function(req, res){
    try {
        // if user making this request is not the admin
        // they don't have privilge to create review
        if(req.user.type != 'admin'){
            req.flash('error', `You don't have privilege. Only admins can assign work!!`);
            return res.redirect('back');
        }

        const review = await Review.create(req.body);

        // populate assigned reviews array for "from" user
        const fromUser = await User.findById({from: req.body.from});
        fromUser.assignedReviews.push(review);
        await fromUser.save();

        // populate assigned reviews array for "to" user
        const toUser = await User.findById({from: req.body.to});
        toUser.assignedReviews.push(review);
        await toUser.save();

        req.flash('success', 'Review created successfully!');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        req.flash('error', error);
        return res.redirect('back');
    }
}

// complete review
module.exports.completeReview = async function (req, res) {
    try {
        if(req.body.message && req.body.message == ""){
            req.flash('error', 'Message cannot be empty!');
            return redirect('back');
        }
        const review = await Review.findOneAndUpdate({from: req.user, to: req.body.id}, {message: req.body.message});
        await User.findByIdAndUpdate(req.user, {$pull: {assignedReviews: review._id}});
        req.flash("success", "Review completed!");
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
}