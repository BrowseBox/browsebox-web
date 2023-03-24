/*
    Routes concerning review actions.
*/

const express = require('express');
const reviewControllers = require('../controllers/review-controllers');

const router = express.Router();

router.post('/get-reviews', reviewControllers.getReviews);

module.exports = router;