const { jsonResponse } = require("../lib/jsonResponse");
const User = require('../models/user');

const signUp = async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: 'All fields are required'
        }));
    }

    try {
        const user = new User();
        const exist = await user.usernameExists(username);

        console.log(exist);

        if (exist) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: 'Username already exists'
                })
            )
        }

        const newUser = new User({ name, username, password });

        await newUser.save();

        res.status(200).json(jsonResponse(200, {
            message: 'User Created Successfully',
        }));
    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: 'Errir creating user',
        }));
    }
};

module.exports = {
    signUp,
}