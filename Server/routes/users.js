// Users Routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');


// create a user
// api/users
router.post('/', 
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Enter a valid email').isEmail(),
		check('password', 'Minimun 6 characters on password').isLength({ min: 6})
	],
	userController.createUser);

module.exports = router;
