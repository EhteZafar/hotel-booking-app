const express = require('express');
const router = express.Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controllers/hotel");
const { verifyAdmin } = require('../utils/verifyToken');

router.post('/', verifyAdmin, createHotel);

router.put('/:id', verifyAdmin, updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/:id', getHotel);

router.get('/', getHotels);

module.exports = router;