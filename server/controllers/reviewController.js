const { google } = require('googleapis');
const User = require('../models/User');

exports.fetchReviews = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const mybusiness = google.mybusiness({
        version: 'v4',
        auth: user.accessToken,
    });

    const reviews = await mybusiness.accounts.locations.reviews.list({
        parent: 'accounts/{accountId}/locations/{locationId}',
    });

    res.status(200).json(reviews.data);
};

exports.publishResponse = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { reviewId, responseText } = req.body;

    const mybusiness = google.mybusiness({
        version: 'v4',
        auth: user.accessToken,
    });

    const response = await mybusiness.accounts.locations.reviews.updateReply({
        name: `accounts/{accountId}/locations/{locationId}/reviews/${reviewId}/reply`,
        requestBody: {
            comment: responseText,
        },
    });

    res.status(200).json(response.data);
};