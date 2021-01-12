import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/authorization/authContext';

const Header = () => {
	// get the auth data
	const authContext = useContext(AuthContext);
	const {userAuthenticated, logOut, user} = authContext;

	useEffect (() => {
		userAuthenticated();
		// eslint-disable-next-line
	}, [])
	return (  
		<header className="app-header">
			{user ? <p className="nombre-usuario">Hi <span>{user.name}</span></p> : null}		
			<nav className="nav-principal">
				<button 
					className="btn btn-blank cerrar-sesion boton-cerrar"
					onClick={() => logOut()}
				>Logout</button>
			</nav>
		</header>
	);
}
 
export default Header;