const Hotel = require('../models/hotel');


const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch (err) {
        next(err);
    }
};

const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        next(err);
    }
};

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted...");
    }
    catch (err) {
        next(err);
    }
};

const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch (err) {
        next(err);
    }
};

const getHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
};

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels };