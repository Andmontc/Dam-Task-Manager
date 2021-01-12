import React, {useReducer} from 'react';
import ProjectContext from'./projectcontext';
import projectreducer from './projectreducer';
import {PROJECT_FORM, GET_PROJECTS, 
	ADD_PROJECTS, VALIDATE_PROJECTS,
	ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERROR} from '../../types';

import axiosClient from '../../config/axios';

const ProjectState = props => {
	

	const initialState = {
		projects : [],
		newProject : false,
		formError : false,
		project: null,
		message: null
	}

	//Action dispatch
	const [state, dispatch] = useReducer(projectreducer, initialState)

	// CRUD functions

	const showForm = () => {
		dispatch({
			type: PROJECT_FORM
		})
	}

	//Get projects
	const getProjects = async () => {
		try {
			const ans = await axiosClient.get('/api/projects');
			dispatch({
				type: GET_PROJECTS,
				payload: ans.data.projects
			})
		} catch (error) {
			const alert = {
				msg: ' An Error has occurred',
				category: 'alerta-error'
			}
			dispatch ({
				type:PROJECT_ERROR,
				payload: alert
			})
		}
	}

	// Add projects
	const addProject = async projects => {
		try {
			const ans = await axiosClient.post('/api/projects', projects);
			dispatch({
				type: ADD_PROJECTS,
				payload: ans.data
			})
		} catch (error) {
			const alert = {
				msg: ' An Error has occurred',
				category: 'alerta-error'
			}
			dispatch ({
				type:PROJECT_ERROR,
				payload: alert
			})
		}
	
	}

	// Handle errors
	const showError = () => {
		dispatch({
			type: VALIDATE_PROJECTS
		})
	}

	// Select a project
	const actualProject = projectID => {
		dispatch({
			type: ACTUAL_PROJECT,
			payload: projectID
		})
	}

	// delete project
	const deleteProject = async projectID => {
		try {
			await axiosClient.delete(`/api/projects/${projectID}`);
			dispatch({
				type:DELETE_PROJECT,
				payload: projectID
			})
		} catch (error) {
			const alert = {
				msg: ' An Error has occurred',
				category: 'alerta-error'
			}
			dispatch ({
				type:PROJECT_ERROR,
				payload: alert
			})
		}
	}

	return (
		<ProjectContext.Provider
			value={{
				projects:state.projects,
				newproject:state.newProject,
				formError:state.formError,
				project:state.project,
				message:state.message,
				showForm,
				getProjects,
				addProject,
				showError,
				actualProject,
				deleteProject
			}}
	
		>
			{props.children}
		</ProjectContext.Provider>
	)
}

export default ProjectState;