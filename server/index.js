const express = require('express');
require('dotenv').config();
require('colors');
require('./auth');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const protectRoute = require('./middleware/authMiddleware');
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Express app
const app = express();

// Express Session
app.use(
	session({
		secret: require('crypto').randomBytes(64).toString('hex'),
		resave: false,
		saveUninitialized: true,
	})
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Cors
app.use(cors());

app.use(express.json()); // If the request has a body, parses and attaches to the request object
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/clients');

// Passport callback
app.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: `${process.env.CLIENT_URL}/dashboard`,
		failureRedirect: '/api/users/auth/google',
	})
);

// Error Handler
app.use(errorHandler);

// Listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
