import React, {useReducer} from 'react';
import alertReducer from '../alerts/alertReducer';
import alertContext from '../alerts/alertContext';
import { SHOW_ALERT, HIDE_ALERT} from '../../types';

const AlertState = props => {
	const initialState = {
		alert: null
	}

	const [ state, dispatch] = useReducer(alertReducer, initialState)

	// functions
	const showAlert = (msg, categoria) => {
		dispatch ({
			type: SHOW_ALERT,
			payload:{
				msg,
				categoria
			}	
		});

		setTimeout(() => {
			dispatch ({
				type: HIDE_ALERT
			})
		}, 5000 );
	}

	return (
		<alertContext.Provider
			value={{
				alert: state.alert,
				showAlert
			}}
		>
			{props.children}
		</alertContext.Provider>
	)

}
export default AlertState;



