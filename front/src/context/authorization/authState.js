import React, {useReducer} from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import tokenAuth from '../../config/tokenAuth';
import { SUCCESS_REGISTER,ERROR_REGISTER, GET_USER, SUCCESS_LOGIN,
	ERROR_LOGIN, LOG_OUT } from '../../types';
import axiosClient from '../../config/axios';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		authenticated: null,
		user: null,
		message: null,
		loading: true
	}

	const [state, dispatch] = useReducer(authReducer, initialState);

	const userRegister = async data => {
		try {
			const ans = await axiosClient.post('/api/users', data);
			console.log(ans.data);
			dispatch ({
				type: SUCCESS_REGISTER,
				payload: ans.data
			})
			// get the user registered
			userAuthenticated();
		} catch (error) {
			const alert = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch ({
				type: ERROR_REGISTER,
				payload: alert
			})
		}
	}

	// registered user
	const userAuthenticated = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			tokenAuth(token);
		}
		try {
		  const  ans = await axiosClient.get('/api/auth');
		  dispatch ({
			  type: GET_USER,
			  payload: ans.data.user
		  });

		} catch(error) {
			dispatch({
				type: ERROR_LOGIN
			})
		}
	}

	// sign in function
	const signIn = async data => {
		try {
			const ans = await axiosClient.post('/api/auth', data);
			dispatch ({
				type: SUCCESS_LOGIN,
				payload: ans.data
			});

			// get the user
			userAuthenticated();
		} catch (error) {
			console.log(error.response.data.msg);
			const alert = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			}
			dispatch ({
				type: ERROR_LOGIN,
				payload: alert
			})
		}
	}

	// logout
	const logOut = () => {
		dispatch ({
			type: LOG_OUT
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				authenticated: state.authenticated,
				user: state.user,
				message: state.message,
				loading: state.loading,
				userRegister,
				signIn,
				userAuthenticated,
				logOut
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState;