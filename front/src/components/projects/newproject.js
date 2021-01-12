import React, {Fragment, useState, useContext} from 'react';
import ProjectContext from '../../context/projects/projectcontext';

const Newproject = () => {

	const ProjectsContext = useContext(ProjectContext);
	const {newproject, showForm, addProject, showError, formError } = ProjectsContext;

	const [project, saveProyect] = useState({
		name:''
	});
	const {name} = project;

	const onChangeProject = e => {
		saveProyect({
			...project,
			[e.target.name] : e.target.value
		})
	}

	// submit function
	const onSubmitproject = e => {
		e.preventDefault();

		// validations
		if (name === '') {
			showError();
			return;
		}

		//state
		addProject(project);
		
		// Reload Form
		saveProyect({
			name: '',
		})

	}
	return ( 
		<Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={() => showForm()}
			>New Proyect</button>
			{
				newproject ?
				(
				<form
					className="formulario-nuevo-proyecto"
					onSubmit={onSubmitproject}
				>
					<input
						type="text"
						className="input-text"
						placeholder="Project name"
						name="name" 
						value={name}
						onChange={onChangeProject}/>
					<input
						type="submit"
						className="btn btn-block btn-primario"
						value="Add Project" />	
				</form>
				) : null
			}
			{formError ? <p className="mensaje error">The project name is Required</p>
			: null}
		</Fragment>
	 );
}
 
export default Newproject;