const Project = require('../Models/Project');
const { validationResult } = require('express-validator'); 


exports.createProject = async(req, res) => {

	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ Errors: errors.array()})
	}

	try {
		// create a new proyect
		const project = new Project(req.body);

		// save creator
		project.creator = req.user.id;
		//save project
		project.save();
		res.json(project);


	} catch (error) {
		console.log(error);
		res.status(500).send('An Error has occurred');
	}

}

// get all projects from the actual user
exports.getProjects = async (req, res) => {
	try {
		const projects = await Project.find({creator: req.user.id}).sort({date: -1});
		res.json({projects});
	} catch(error) {
		console.log(error);
		res.status(500).send('An Error has occurred');
	}
}

// update a project
exports.updateProject = async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		return res.status(400).json({ Errors: errors.array()})
	}
	// get the project data
	const {name} = req.body;
	const newProject = {};
	if (name) {
		newProject.name = name;
	}

	try {
		// check the id
		let project = await Project.findById(req.params.id);

		// check if the project exists
		if (!project) {
			return res.status(404).json({msg: 'Project not found'});
		}
		// check the creator

		if (project.creator.toString() !== req.user.id ) {
			return res.status(401).json({msg: 'not authorized'});
		}

		// update
		project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set : newProject}, {new: true});
		res.json({project});

	} catch(error) {
		console.log(error);
		res.status(500).send('An Error has occurred');
	}
}

// delete a project by id
exports.deleteProject = async (req, res) => {
	try {
		// check the id
		let project = await Project.findById(req.params.id);

		// check if the project exists
		if (!project) {
			return res.status(404).json({msg: 'Project not found'});
		}
		// check the creator

		if (project.creator.toString() !== req.user.id ) {
			return res.status(401).json({msg: 'not authorized'});
		}
		// delete the project
		await Project.findOneAndRemove({_id: req.params.id});
		res.json({msg: 'Project deleted'})

	} catch(error) {
		console.log(error);
		res.status(500).send('An Error has occurred');
	}
}