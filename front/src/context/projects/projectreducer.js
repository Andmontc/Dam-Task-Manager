import {PROJECT_FORM, GET_PROJECTS, ADD_PROJECTS,
	VALIDATE_PROJECTS,
	ACTUAL_PROJECT,
	DELETE_PROJECT, PROJECT_ERROR} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case PROJECT_FORM:
			return {
				...state,
				newProject: true
			}
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload
			}
		case ADD_PROJECTS:
			return {
				...state,
				projects: [...state.projects, action.payload],
				newProject: false,
				formError: false
			}
		case VALIDATE_PROJECTS:
			return {
				...state,
				formError: true
			}
		case ACTUAL_PROJECT:
			return {
				...state,
				project: state.projects.filter(project => project._id === action.payload)
			}
		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter(project => project._id !== action.payload),
				project: null
			}
		case PROJECT_ERROR:
			return {
				...state,
				message: action.payload
			}
		default:
			return state;
	}
}