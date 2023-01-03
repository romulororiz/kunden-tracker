const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Coming from the controller
router.post('/', registerUser).post('/login', loginUser);

module.exports = router;
