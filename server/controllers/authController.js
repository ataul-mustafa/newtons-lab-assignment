const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, name, email } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });
    if (!user) {
        user = new User({
            googleId: sub,
            name,
            email,
        });
        await user.save();
    }

    res.status(201).json(user);
};