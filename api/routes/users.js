const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.post('/', async (req, res, next) => {
    // const newUser = new User(req.body);

    // try {
    //     const savedUser = await newUser.save();
    //     res.status(200).json(savedUser);
    // }
    // catch (err) {
    //     next(err);
    // }

});

module.exports = router;