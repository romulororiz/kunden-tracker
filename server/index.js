const path = require('path');
const express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Express app
const app = express();

// Cors
app.use(cors());

app.use(express.json()); // If the request has a body, parses and attaches to the request object
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));

// Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	// Serve frontend
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../client/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
	});
}

// Listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
