const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { generateAccessToken, generateRefreshToken } = require('../middlewares/auth/generateTokens');
const Token = require('./token');
const { getUserInfo } = require('../lib/getUserInfo');

const UserSchema = new mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.usernameExists = async function (username) {
    const result = await this.model('User').findOne({ username });

    return result !== null;
};

UserSchema.methods.comparePassword = async function (password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same;
}

UserSchema.methods.createAccessToken = function () {
    return generateAccessToken(getUserInfo(this));
}

UserSchema.methods.createRefreshToken = async function () {
    const refreshToken = generateRefreshToken(getUserInfo(this));

    try {
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model('User', UserSchema);