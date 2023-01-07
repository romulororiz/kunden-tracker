const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const {
	getClients,
	addClient,
	getClient,
	deleteClient,
	updateClient,
	filteredClients,
} = require('../controllers/clientController');

router
	.route('/')
	.get(protectRoute, getClients)
	.post(protectRoute, addClient)
	.get(protectRoute, filteredClients);

router
	.route('/:id')
	.get(protectRoute, getClient)
	.delete(protectRoute, deleteClient)
	.put(protectRoute, updateClient);

module.exports = router;
