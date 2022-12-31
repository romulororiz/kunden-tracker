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

// Middleware
app.use(express.json()); // If the request has a body, parses and attaches to the request object
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Error Handler
app.use(errorHandler);

// Listen for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
