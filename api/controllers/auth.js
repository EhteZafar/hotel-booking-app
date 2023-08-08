const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

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
        const user = await User.findOne({ username: req.body.username });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!user) {
            return next(createError(400, "user not found"));
        }else if (!isPasswordCorrect) {
            return next(createError(400, "password is wrong"));
        }

        const { password, isAdmin , ...otherDetails } = user._doc;

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: "5d" });

        res.cookie("access_token", token, {httpOnly: true,}).status(200).json({ ...otherDetails});
    }
    catch (err) {
        next(err);
    }

};

module.exports = { register, login };