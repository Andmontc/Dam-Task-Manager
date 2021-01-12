import React, {useContext, useState, useEffect} from 'react';
import ProjectContext from '../../context/projects/projectcontext';
import TaskContext from '../../context/tasks/taskcontext';

const Formtask = () => {

	const ProjectsContext = useContext(ProjectContext);
	const {project} = ProjectsContext;
	const TasksContext = useContext(TaskContext);
	const {addTask, taskValidate, getTask, taskError, taskSelected, editTask} = TasksContext;

	// effect when a task is selected
	useEffect(() => {
		if (taskSelected !== null) {
			saveTask(taskSelected);
		} else {
			saveTask ({
				name: ''
			})
		}
	}, [taskSelected]);
	//form state
	const [task, saveTask] = useState({
		name:''
	})
	const {name} = task;

	// validate projects
	if (!project) return null;
	// array destructuring
	const [actualProject] = project;

	//read the form values
	const handleChange = e => {
		saveTask({
			...task,
			[e.target.name] : e.target.value
		})
	}

	const onSubmit = e => {
		e.preventDefault();

		//validate
		if (name.trim() === '') {
			taskValidate();
			return;
		}

		// edit or add new task
		if (taskSelected === null) {
			task.project = actualProject._id;
			addTask(task);
		} else {
			editTask(task);
		}
	
		// get the actual project tasks
		getTask(actualProject._id);

		// reset form
		saveTask({
			name:''
		})
	}

	return (
		<div className="formulario">
			<form
				onSubmit={onSubmit}
			>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Task name..."
						name="name"
						value={name}
						onChange={handleChange}
						/>
				</div>
				<div className="contenedor-input">
					<input
						type="submit" 
						className="btn btn-block btn-primario btn-submit"
						value={taskSelected ? 'Edit Task' : 'Add Task'}
					/>

				</div>
			</form>
			{taskError ? <p className="mensaje error">Task name is Required</p> : null }
		</div>

	 );
}
 
export default Formtask;