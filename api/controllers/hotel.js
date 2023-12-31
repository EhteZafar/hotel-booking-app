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

    const {minPrice, maxPrice, ...others} = req.query;

    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gte: minPrice || 1, $lte: maxPrice || 1000},
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
};

const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(',');
    try{
        const list = await Promise.all(cities.map(async (city) => {
            return Hotel.countDocuments({city: city});
        }));

        res.status(200).json(list);
    }
    catch (err) {
        next(err);
    }
};

const countByType = async (req, res, next) => {

    try{
        const hotelCount = await Hotel.countDocuments({type: "hotel"});
        const apartmentCount = await Hotel.countDocuments({type: "apartment"});
        const resortCount = await Hotel.countDocuments({type: "resort"});
        const villaCount = await Hotel.countDocuments({type: "villa"});
        const cabinCount = await Hotel.countDocuments({type: "cabin"});

        res.status(200).json([
            {type: "apartment", count: apartmentCount},
            {type: "cabin", count: cabinCount},
            {type: "hotel", count: hotelCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount}
        ]);
    }
    catch (err) {
        next(err);
    }
};

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType };