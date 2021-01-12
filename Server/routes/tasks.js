const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../Middleware/auth');
const { check } = require('express-validator');

// create a task
// api/tasks
router.post('/',
	auth,
	[
		check('name', 'Name is required').not().isEmpty(),
		check('project', 'Project is required').not().isEmpty()
	],
	taskController.createTask
);

//get the tasks
router.get('/',
	auth,
	taskController.getTasks
);

// update task
router.put('/:id',
	auth,
	taskController.updateTask
);

// delete a task
router.delete('/:id',
	auth,
	taskController.deleteTask
);


module.exports = router;
