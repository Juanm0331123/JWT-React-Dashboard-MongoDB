const { jsonResponse } = require("../lib/jsonResponse");

const logIn = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: 'All fields are required'
        }));
    }

    // Autenticar Usuario
    const accesToken = "access_token";
    const refreshToken = "refresh_token";
    const user = {
        id: "1",
        name: "Juan",
        username: "juanito",
    };

    res.status(200).json(jsonResponse(200, { user, accesToken, refreshToken }));
};

module.exports = {
    logIn,
}