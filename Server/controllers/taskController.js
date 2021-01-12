const Task = require('../Models/Task');
const Project = require('../Models/Project');
const {validationResult} = require('express-validator');

// create a task

exports.createTask = async (req, res) => {
		// check for errors
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			return res.status(400).json({ Errors: errors.array()})
		}
		// get the project and validate the existance
		const {project} = req.body;
		try {
			const actualproject = await Project.findById(project);
			if (!actualproject){
				return res.status(404).json({msg: 'Project not found'})
			}
			// check if the project belong to the user authenticated
			if (actualproject.creator.toString() !== req.user.id ) {
				return res.status(401).json({msg: 'not authorized'});
			}
			// create the task
			const task = new Task(req.body);
			await task.save();
			res.json({task});

		} catch(error) {
			console.log(error);
			res.status(500).send('An Error has occurred')
		}
}

//get the task by project
exports.getTasks = async(req,res) =>{
	//get the project
	const {project} = req.query;
	try {
		const actualproject = await Project.findById(project);
			if (!actualproject){
				return res.status(404).json({msg: 'Project not found'})
			}
			// check if the project belong to the user authenticated
			if (actualproject.creator.toString() !== req.user.id ) {
				return res.status(401).json({msg: 'not authorized'});
			}
			// get the tasks by id
			const tasks = await Task.find({project}).sort({date: -1});
			res.json({tasks});
	} catch (error) {
		console.log(error);
		res.status(500).send('An Error has  occurred')
	}
}
//update the task by project
exports.updateTask = async(req,res) =>{
	const {project, name, state} = req.body;
	try {
		// check if the task exists
		let actualtask = await Task.findById(req.params.id);
		if (!actualtask) {
			return res.status(404).json({msg: 'the task do not exist'});
		}
		// check if the project belong to the user authenticated
		const actualproject = await Project.findById(project);
			if (actualproject.creator.toString() !== req.user.id ) {
				return res.status(401).json({msg: 'not authorized'});
			}
			
		// create an object with the update
		const newTask = {};
		newTask.name = name;
		newTask.state = state;

		// save the task
		actualtask = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});
		res.json({actualtask});
	} catch (error){
		console.log(error);
		res.status(500).send('An Error has  occurred')
	}
}

// delete a Task
exports.deleteTask = async(req, res) => {
	const {project} = req.query;
	try {
		// check if the task exists
		let actualtask = await Task.findById(req.params.id);
		if (!actualtask) {
			return res.status(404).json({msg: 'the task do not exist'});
		}
		// check if the project belong to the user authenticated
		const actualproject = await Project.findById(project);
			if (actualproject.creator.toString() !== req.user.id ) {
				return res.status(401).json({msg: 'not authorized'});
			}
		// delete a task
		await Task.findByIdAndRemove({_id: req.params.id});
		res.json({msg: 'Task deleted'})
		
	} catch (error){
		console.log(error);
		res.status(500).send('An Error has  occurred')
	}

}
