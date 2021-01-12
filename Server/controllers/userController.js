const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {

	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ Errors: errors.array()})
	}

	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({msg: 'The user already exists'});
		}

		// create user
		user = new User(req.body);

		//hash the password
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(password, salt);

		// save user
		await user.save();

		// create and sign jwt
		const payload = {
			user:{
				id: user.id
			}
		};
		jwt.sign(payload, process.env.SECRET,{
			expiresIn: 3600
		}, (error, token) => {
			if (error) throw error;

			res.json({ token });
		});

	} catch (error) {
		console.log(error);
		res.status(400).send('An error has ocurred');
	}
}	