import React, {useReducer} from 'react';
import TaskContext from './taskcontext';
import TaskReducer from './taskreducer';
import  {
	GET_TASKS, ADD_TASKS, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK,
	EDIT_TASK
} from '../../types'

import axiosClient from '../../config/axios';

const TaskState = props => {

	const initialState = {
		projectTasks: [],
		taskError: false,
		taskSelected: null
	}
	const [state, dispatch] = useReducer(TaskReducer, initialState);

	// Functions

	// get taks
	const getTask = async project => {
		try {
			const ans = await axiosClient.get('/api/tasks', {params: {project }});
			dispatch ({
				type: GET_TASKS,
				payload: ans.data.tasks
			})
		} catch (error) {
			console.log(error);
		}
	}

	// add task
	const addTask = async task => {
		try {
			const ans = await axiosClient.post('/api/tasks', task);
			console.log(ans);
			dispatch({
				type:ADD_TASKS,
				payload: task
			})
		} catch (error) {
			console.log(error);
		}
	}

	// validate for Errors
	const taskValidate = () => {
		dispatch({
			type: VALIDATE_TASK,
		})
	}

	// delete task
	const deleteTask = async (id, project) => {
		try {
			await axiosClient.delete(`/api/tasks/${id}`, {params: {project}});
			dispatch ({
				type: DELETE_TASK,
				payload: id
			})
		} catch (error) {
			console.log(error);
		}
	}

	// edit task
	const editTask = async task => {
		const ans = await axiosClient.put(`/api/tasks/${task._id}`, task);
		try {
			dispatch ({
				type: EDIT_TASK,
				payload: ans.data.actualtask			
			})
		} catch (error) {
			console.log(error);
		}
	}

	// save actual task
	const saveActualtask = task => {
		dispatch ({
			type: ACTUAL_TASK,
			payload: task
		})
	}



	return (
		<TaskContext.Provider
			value = {{
				projectTasks: state.projectTasks,
				taskError: state.taskError,
				taskSelected: state.taskSelected,
				getTask,
				addTask,
				taskValidate,
				deleteTask,
				saveActualtask,
				editTask
			}}
		>
				{props.children}
			</TaskContext.Provider>
	)
}

export default TaskState;