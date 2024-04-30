const { jsonResponse } = require("../lib/jsonResponse");

const signout = (req, res) => {
    res.send('Sign Out');
};

module.exports = {
    signout,
}