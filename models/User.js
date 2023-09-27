const mongoose = require('mongoose');

/**
 * User Schema
 * name
 * email
 * password
 * type: [admin, employee]
 * assignedReviews: reviews that are assigned to the employee
 * reviews: reviews that are received by the employee
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
        enum: ['admin', 'employee']
    },
    assignedReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;