const mongoose = require('mongoose');
const clients = require('./data/clients');
const colors = require('colors');
const Client = require('./models/Client');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();

connectDB();

const importData = async () => {
	try {
		await Client.deleteMany();

		// Add user as admin
		const sampleProducts = clients.map(product => {
			return product;
		});

		await Client.insertMany(sampleProducts);
		console.log('Data imported'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Client.deleteMany();

		console.log('Data destroyed'.red.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
