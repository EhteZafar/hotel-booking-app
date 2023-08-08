const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUser, getUsers} = require('../controllers/user');
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken');

// router.get("/checkauthentication", verifyToken, (req, res) => {
//     res.status(200).json({ success: true });
// });

// router.get("/checkuser/:id", verifyUser, (req, res) => {
//     res.status(200).json({ success: true });
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//     res.status(200).json({ success: true });
// });

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get('/:id', verifyUser, getUser);

router.get('/', verifyAdmin, getUsers);


module.exports = router;