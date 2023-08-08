const express = require('express');
const router = express.Router();
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require("../controllers/room");
const { verifyAdmin } = require('../utils/verifyToken');
// router.get('/', (req, res) => {
//     res.send('Hello World!');
//     }
// );

router.post('/:hotelId', verifyAdmin, createRoom);

router.put('/:id', verifyAdmin, updateRoom);

router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

router.get('/:id', getRoom);

router.get('/', getRooms);
module.exports = router;