import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authorization/authContext';

const Login = (props) => {

	// context
	const alertContext = useContext(AlertContext);
	const {alert, showAlert} = alertContext;
	
	const authContext = useContext(AuthContext);
	const {signIn, message, authenticated} = authContext;

	// pass or user do not exists
	useEffect (() => {
		if (authenticated) {
			props.history.push('/projects')
		}
		if (message){
			showAlert(message.msg, message.categoria);
		}
		//eslint-disable-next-line
	}, [message, authenticated, props.history])

	const [login, saveLogin] = useState({
		email:'',
		password:''
	});

	const {email, password} = login;
	const onChange = e => {
		saveLogin({
			...login,
		[e.target.name] : e.target.value
		})
	}

	const onSubmit = e => {
		e.preventDefault();

		if (email.trim() === '' || password.trim() === '') {
			showAlert('All fields are required', 'alerta-error');
		}

		signIn({email, password});
	}

	return ( 
		<div className="form-usuario">
			{alert ? (<div className={`alerta ${alert.categoria}`}>{alert.msg}</div>) : null}
			<div className="contenedor-form sombra-dark">
				<h1> Login </h1>
				<form
					onSubmit={onSubmit}
				>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
							/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={onChange}
							/>
					</div>
					<div className="campo-form">
						<input 
						type="submit"
						className="btn btn-primario btn-block"
						value="Login"
						/>
					</div>
				</form>
				<Link to={'/new-acc'} className="enlace-cuenta">
					Sign up
				</Link>
			</div>
		</div>
	 );
}
 
export default Login;