const express = require('express');
const router = express.Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controllers/hotel");

router.post('/', createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

router.get('/:id', getHotel);

router.get('/', getHotels);

module.exports = router;