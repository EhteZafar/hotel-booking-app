const User = require('../models/User');

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    console.log(req.params.id);
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }
    catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const User = await User.findById(req.params.id);
        res.status(200).json(User);
    }
    catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try{
        const Users = await User.find();
        res.status(200).json(Users);
    }
    catch (err) {
        next(err);
    }
};

module.exports = {updateUser, deleteUser, getUser, getUsers };