import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/sidebar';
import Header from '../layout/header';
import Formtask from '../tasks/formtask';
import Tasklist from '../tasks/tasklist';
import AuthContext from '../../context/authorization/authContext';

const Proyects = () => {

	// get the auth data
	const authContext = useContext(AuthContext);
	const {userAuthenticated} = authContext;

	useEffect (() => {
		userAuthenticated();
		// eslint-disable-next-line
	}, [])
	
	return ( 
		<div className="contenedor-app">
			<Sidebar />
			<div className="seccion-principal">
				<Header/>
				<main>
					<Formtask/>
					<div className="contenedor-tareas">
						<Tasklist />
					</div>
				</main>
			</div>		
		</div>

	 );
}
 
export default Proyects;