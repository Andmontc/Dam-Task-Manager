import React, {useContext} from 'react';
import ProjectContext from '../../context/projects/projectcontext';
import TaskContext from '../../context/tasks/taskcontext';


const Task = ({task}) => {

	const ProjectsContext = useContext(ProjectContext);
	const {project} = ProjectsContext;
	const TasksContext = useContext(TaskContext);
	const {deleteTask, getTask, editTask, saveActualtask} = TasksContext;

	const [actualProject] = project
	// delete task function
	const deltask = id => {
		deleteTask(id, actualProject._id);
		getTask(actualProject.id);
	}
	// change the task state
	const stateChange = task => {
		if (task.state) {
			task.state = false;
		} else {
			task.state = true;
		}
		editTask(task);
	}
	// edit a task
	const selectTask = task => {
		saveActualtask(task);
	}
	return ( 
		<li className="tarea sombra">
			<p>{task.name}</p>
			<div className="estado">
				{task.state 
				? (<button
					type="button"
					className="completo"
					onClick={() => stateChange(task)}
				>Completed</button>)
				:(<button
					type="button"
					className="incompleto"
					onClick={() => stateChange(task)}
				>Incomplete</button>)
			}
			</div>
			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={() => selectTask(task)}
				>Edit</button>

				<button
					type="button"
					className="btn btn-secundario"
					onClick={()=> deltask(task._id)}
				>Delete</button>
			</div>
		</li>
	 );
}
 
export default Task;