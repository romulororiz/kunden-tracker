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

	const clients = await Client.find({ user: req.user.id }).sort('-createdAt');

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

// @desc Delete client
// @route DELETE /api/clients/:id
// @access private
const deleteClient = asyncHandler(async (req, res) => {
	// get User
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

	// Check if client belongs to User
	if (client.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorized');
	}

	await client.remove();

	res.status(200).json({ message: 'Client deleted' });
});

// @desc Update client
// @route PUT /api/clients/:id
// @access private
const updateClient = asyncHandler(async (req, res) => {
	const client = await Client.findById(req.params.id);

	if (!client) {
		res.status(404);
		throw new Error('Client not found');
	}

	if (client.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	const updatedClient = await Client.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	);

	res.status(200).json(updatedClient);
});

// @desc Update client
// @route GET /api/clients
// @access private
const filteredClients = (req, res) => {
	let firstName = '';
	let lastName = '';
	let city = '';

	// If the param is present set the variable to value
	if (req.query.firstName) {
		firstName = req.query.firstName;
	}

	if (req.query.lastName) {
		lastName = req.query.lastName;
	}

	if (req.query.city) {
		city = req.query.city;
	}

	Client.find(
		{
			firstName: new RegExp(firstName, i),
			lastName: new RegExp(lastName, i),
			'address.city': new RegExp(city, i),
		},
		(err, clients) => {
			if (err) {
				res.status(404);
				throw new Error('Error');
			} else {
				res.send(clients);
			}
		}
	);
};

module.exports = {
	getClients,
	addClient,
	getClient,
	deleteClient,
	updateClient,
	filteredClients,
};
