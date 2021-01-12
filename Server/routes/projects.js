const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../Middleware/auth');
const { check } = require('express-validator');

// create proyects
// api/proyects
router.post('/',
	auth,
	[
		check('name', "The name of the project is required").not().isEmpty()
	],
	projectController.createProject
);
// get projects
router.get('/',
	auth,
	projectController.getProjects
);
// update projects
router.put('/:id',
	auth,
	[
		check('name', "The name of the project is required").not().isEmpty()
	],
	projectController.updateProject
);
// delete a project
router.delete('/:id',
	auth,
	projectController.deleteProject
)

module.exports = router;