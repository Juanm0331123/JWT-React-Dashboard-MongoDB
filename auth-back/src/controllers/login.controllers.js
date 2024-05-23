const { jsonResponse } = require("../lib/jsonResponse");
const User = require('../models/user')
const { getUserInfo } = require('../lib/getUserInfo');

const logIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: 'All fields are required'
        }));
    }

    const user = await User.findOne({ username });

    if (user) {
        const correctPassword = await user.comparePassword(password, user.password);
        if (correctPassword) {
            // Autenticar Usuario
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();

            return res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
        } else {
            res.status(400).json(jsonResponse(400, {
                error: 'User or password incorrect'
            }))
        }
    } else {
        res.status(400).json(jsonResponse(400, {
            error: 'User not found'
        }))
    }
};

module.exports = {
    logIn,
}