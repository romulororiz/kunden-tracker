const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const { getClients, addClient } = require('../controllers/clientController');

router.route('/').get(protectRoute, getClients).post(protectRoute, addClient);

module.exports = router;
