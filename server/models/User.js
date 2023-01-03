const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	googleId: { type: String },
	email: { type: String },
	profilePic: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	fullName: { type: String },
});

module.exports = mongoose.model('User', userSchema);
