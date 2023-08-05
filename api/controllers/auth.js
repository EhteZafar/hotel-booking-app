const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');

const register = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        next(err);
    }

};

const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return next(createError(400, "user not found"));
        }
        res.status(200).json("User logged in");
    }
    catch (err) {
        next(err);
    }

};

module.exports = { register, login };