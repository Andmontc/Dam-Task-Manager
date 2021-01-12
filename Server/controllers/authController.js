const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.userAuth = async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ Errors: errors.array()})
	}

	const {email, password} = req.body;

	try {
		// check for a registered user
		let user = await User.findOne({email});
		if (!user){
			return res.status(400).json({msg: 'User does not exists'});
		}
		
		//check password

		const correctPass = await bcryptjs.compare(password, user.password);
		if (!correctPass){
			return res.status(400).json({msg:'Incorrect password'});
		}

		// create and sign jwt
		const payload = {
			user:{
				id: user.id
			}
		};
		jwt.sign(payload, process.env.SECRET,{
			expiresIn: 36000
		}, (error, token) => {
			if (error) throw error;

			res.json({ token });
		});
	} catch(error) {
		console.log(error);
	}
}

// user authenticated
exports.userRegistered = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json({user});
	} catch (error) {
		console.log(error);
		res.status(500).json({msg: 'An Error has occurred'});
	}
}