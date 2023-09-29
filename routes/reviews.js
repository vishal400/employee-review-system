const express = require('express');
const router = express.Router();
const passport = require('passport');

const reviewsController = require('../controllers/review_controller');

// get reviews
router.get('/', passport.isAuthenticated, reviewsController.getReviews);
// get assign work page
router.get('/assign-work', passport.isAuthenticated, reviewsController.assignWorkPage);
// create review
router.post('/create', passport.isAuthenticated, reviewsController.createReview);
// complete review
router.post('/complete-review', passport.isAuthenticated, reviewsController.completeReview);

module.exports = router;