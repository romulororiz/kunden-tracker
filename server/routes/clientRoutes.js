const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const {
	getClients,
	addClient,
	getClient,
} = require('../controllers/clientController');

router.route('/').get(protectRoute, getClients).post(protectRoute, addClient);

router.route('/:id').get(protectRoute, getClient);

module.exports = router;
