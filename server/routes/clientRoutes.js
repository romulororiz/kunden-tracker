const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authMiddleware');
const {
	getClients,
	addClient,
	getClient,
	deleteClient,
	updateClient,
} = require('../controllers/clientController');

router.route('/').get(protectRoute, getClients).post(protectRoute, addClient);

router
	.route('/:id')
	.put(protectRoute, updateClient)
	.get(protectRoute, getClient)
	.delete(protectRoute, deleteClient)

module.exports = router;
