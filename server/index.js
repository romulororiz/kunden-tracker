const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
require('colors');

// Express app
const app = express();

// Cors
app.use(cors());

// Connect DB

// Middleware
app.use(express.json()); // If the request has a body, parses and attaches to the request object
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Listen for requests
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
