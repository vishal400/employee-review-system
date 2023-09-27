const mongoose = require('mongoose');

/**
 * Review Schema
 * review: review about the employee
 * from: employee who reviewed
 * to: employee who recieved the review
 */
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        require: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;