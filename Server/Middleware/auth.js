const jwt = require('jsonwebtoken');



module.exports = function(req, res, next) {
	// read the token from the header
	const token = req.header('x-auth-token');

	//check if the token exists
	if (!token) {
		return res.status(401).json({msg: 'invalid permission'})
	}

	// validate the token
	try {
		const cipher = jwt.verify(token, process.env.SECRET);
		req.user = cipher.user;
		next();
	} catch(error){
		res.status(401).json({msg: 'Invalid Token'});
	}
}