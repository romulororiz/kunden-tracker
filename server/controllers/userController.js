const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../middleware/generateToken');

// @desc Register new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Validation
	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	// Find if user already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check user and passwords match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

module.exports = { registerUser, loginUser };
