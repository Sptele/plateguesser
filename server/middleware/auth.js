/**
 * Verifies that the authentication provided is valid. Uses a simple validation, NOT JWT.
 * @param {*} req Provided by Express when it runs this middleware
 * @param {*} res Provided by Express when it runs this middleware
 * @param {*} next Provided by Express when it runs this middleware
 */
function verifyToken(req, res, next) {
	const bearerHeader = req.get("authorization");

	// Check if authorization was provided
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];

		// Check if token is valid
		if (
			bearer[0] !== "Bearer" ||
			bearerToken !== process.env.REACT_APP_SERVER_TOKEN
		) {
			// Error if failed
			res.status(401);
			next(new Error("Invalid token"));
		}
		// Store token, next middleware
		req.token = bearerToken;
		next();
	} else {
		// Error if failed
		res.status(401);
		next(new Error("No Authorization Header"));
	}
}

module.exports = verifyToken;
