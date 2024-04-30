const { jsonResponse } = require("../lib/jsonResponse");

const signUp = (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: 'All fields are required'
        }));
    }

    // Crear el usuario
    res.status(200).json(jsonResponse(200, {
        message: 'User Created Successfully',
    }));

    res.send('Sign Up');
};

module.exports = {
    signUp,
}