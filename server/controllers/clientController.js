const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Client = require('../models/Client');

// @desc Get user clients
// @route GET /api/clients
// @access private
const getClients = asyncHandler(async (req, res) => {
	// get user
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const clients = await Client.find({ user: req.user.id });

	res.status(200).json(clients);
});

// @desc Get client by ID
// @route GET /api/clients/:id
// @access private
const getClient = asyncHandler(async (req, res) => {
	// get user
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const client = await Client.findById(req.params.id);

	if (!client) {
		res.status(404);
		throw new Error('Client not found');
	}

	if (client.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	res.status(200).json(client);
});

// @desc Create new client
// @route POST /api/clients
// @access private
const addClient = asyncHandler(async (req, res) => {
	const { firstName, lastName, city, street, houseNumber, postalCode } =
		req.body;

	if (
		!firstName ||
		!lastName ||
		!city ||
		!street ||
		!houseNumber ||
		!postalCode
	) {
		res.status(400);
		throw new Error('Please fill in all fields');
	}

	// Get user using ID and JWT
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const client = await Client.create({
		user: req.user.id,
		firstName: firstName,
		lastName: lastName,
		address: {
			city: city,
			street: street,
			houseNumber: houseNumber,
			postalCode: postalCode,
		},
		status: 'new',
	});

	res.status(201).json(client);
});

module.exports = { getClients, addClient, getClient };
