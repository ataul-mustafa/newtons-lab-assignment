const express = require('express');
const { fetchReviews, publishResponse } = require('../controllers/reviewController');
const router = express.Router();

router.get('/', fetchReviews);
router.post('/response', publishResponse);

module.exports = router;
