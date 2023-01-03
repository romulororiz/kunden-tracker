const protectRoute = (req, res, next) => {
	try {
		req.user && next();
	} catch (error) {
		console.log(error);
		res.sendStatus(401);
		throw new Error('Not Authorized');
	}
};

module.exports = protectRoute;
