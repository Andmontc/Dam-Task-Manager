import  {
	GET_TASKS, ADD_TASKS, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, EDIT_TASK
} from '../../types';

export default(state, action) => {
	switch(action.type) {
		case GET_TASKS:
			return {
				...state,
				projectTasks: action.payload
			}
		case ADD_TASKS:
			return {
				...state,
				projectTasks: [action.payload, ...state.projectTasks],
				taskError:false
			}
		case VALIDATE_TASK:
			return {
				...state,
				taskError:true
			}

		case DELETE_TASK:
			return {
				...state,
				projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
			}

		case EDIT_TASK:
			return {
				...state,
				projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
				taskSelected: null
			}
		case ACTUAL_TASK:
			return {
				...state,
				taskSelected: action.payload
			}

		default:
			return state;
	}
}
