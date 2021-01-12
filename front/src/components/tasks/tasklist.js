import React,{Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ProjectContext from '../../context/projects/projectcontext';
import TaskContext from '../../context/tasks/taskcontext';
import Task from './task';

const Tasklist = () => {

	const ProjectsContext = useContext(ProjectContext);
	const {project, deleteProject} = ProjectsContext;
	const TasksContext = useContext(TaskContext);
	const {projectTasks} = TasksContext;

	// validate projects
	if (!project) return <h2>Select a project</h2>;
	// array destructuring
	const [actualProject] = project;

	// delete project
	const onclickDelete = () => {
		deleteProject(actualProject._id)
	}
	return ( 
		<Fragment>
		<h2>Project: {actualProject.name}</h2>

		<ul className="listado-tareas">
			{projectTasks.length === 0
			? (<li className="tarea"><p>No Tasks</p></li>)
			: <TransitionGroup>
				{projectTasks.map(task => (
					<CSSTransition
						key={task._id}
						timeout={200}
						classNames="tarea"
					>
						<Task
							task={task}
				/>
					</CSSTransition>
				))}
			</TransitionGroup>
			}
		</ul>
		<button
			type="button"
			className="btn btn-eliminar"
			onClick={onclickDelete}
		> Delete Project &times;</button>

		</Fragment>
	 );
}
 
export default Tasklist;