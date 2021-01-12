import React, {useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Project from './project';
import ProjectContext from '../../context/projects/projectcontext';
import AlertContext from '../../context/alerts/alertContext';

const Projectslist = () => {

	//initialstate
	const ProjectsContext = useContext(ProjectContext);
	const {projects, message, getProjects} = ProjectsContext;

	const alertContext = useContext(AlertContext);
	const {alert, showAlert} = alertContext;

	useEffect(() => {
		// in case of an error
		if (message) {
			showAlert(message.msg, message.category);
		}
		getProjects();
		// eslint-disable-next-line
	}, [message]);

	//validate content
	if (projects.length === 0) return <p> No Projects, create one !</p>;

	return (  
		<ul className="listado-proyectos">
			{ alert ? (<div className={`alerta ${alert.categoria}`}>{alert.msg}</div> ): null}
			<TransitionGroup>
				{projects.map(project => (
					<CSSTransition
						key={project._id}
						timeout={200}
						classNames="proyecto"
					>
					<Project
						project={project}
					/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
}
 
export default Projectslist