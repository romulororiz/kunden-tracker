const express = require('express');
const logout = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
const protectRoute = require('../middleware/authMiddleware');

// Coming from the controller
router
	.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['email', 'profile'] })
	)
	.get('/logout', logout);

module.exports = router;
