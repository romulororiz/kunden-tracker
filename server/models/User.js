const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: { type: String },
	password: { type: String },
	googleId: { type: String },
	profilePic: { type: String },
	firstName: { type: String },
	lastName: { type: String },
});

module.exports = mongoose.model('User', userSchema);
