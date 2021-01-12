// Auth Routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../Middleware/auth');


// user authorization
// api/auth
router.post('/', 
	authController.userAuth
);

//get the user authenticated
router.get('/', 
	auth,
	authController.userRegistered
)
module.exports = router;
