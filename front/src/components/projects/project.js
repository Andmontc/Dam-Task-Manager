import React, {useContext} from 'react';
import ProjectContext from '../../context/projects/projectcontext';
import TaskContext from '../../context/tasks/taskcontext';

const Project = ({project}) => {

	const ProjectsContext = useContext(ProjectContext);
	const {actualProject} = ProjectsContext;
	const TasksContext = useContext(TaskContext);
	const {getTask} = TasksContext;

	// get project and tasks
	const selectProject = id => {
		actualProject(id); // actual project
		getTask(id); // tasks of the actual project
	}

	return ( 
		<li>
			<button
				type="button"
				className="btn btn-blank"
				onClick={()=> selectProject(project._id)}
			>{project.name}</button>
		</li>
	 );
}
 
export default Project;