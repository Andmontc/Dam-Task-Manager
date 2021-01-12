import { SUCCESS_REGISTER,ERROR_REGISTER, GET_USER, SUCCESS_LOGIN,
		 ERROR_LOGIN, LOG_OUT } from '../../types';

export default (state, action) => {
	switch (action.type) {
		case SUCCESS_REGISTER:
		case SUCCESS_LOGIN:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				authenticated: true,
				message: null,
				loading: false
			}

		case GET_USER:
			return {
				...state,
				user: action.payload,
				authenticated: true,
				loading: false
			}
		case LOG_OUT:
		case ERROR_LOGIN:
		case ERROR_REGISTER:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				authenticated: null,
				message: action.payload
			}
		
		default:
			return state;
	}

}