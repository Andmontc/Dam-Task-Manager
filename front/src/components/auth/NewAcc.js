import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authorization/authContext';

const Newacc = (props) => {

	// context
	const alertContext = useContext(AlertContext);
	const {alert, showAlert} = alertContext;

	const authContext = useContext(AuthContext);
	const {userRegister, message, authenticated} = authContext;

	// error case in the register
	useEffect (() => {
		if (authenticated) {
			props.history.push('/projects')
		}
		if (message){
			showAlert(message.msg, message.categoria);
		}
		// eslint-disable-next-line
	}, [message, authenticated, props.history])

	const [login, saveLogin] = useState({
		name: '',
		email:'',
		password:'',
		confirm:''
	});

	const {name, email, password, confirm} = login;
	const onChange = e => {
		saveLogin({
			...login,
		[e.target.name] : e.target.value
		})
	}

	const onSubmit = e => {
		e.preventDefault();

		if (name.trim() === '' || password.trim() === '' || email.trim() === '' || confirm.trim() === '') {
			showAlert('All fields are required', 'alerta-error');
			return;
		}

		if (password.length < 6){
			showAlert('Password must be 6 characters long', 'alerta-error');
			return;
		}

		if (password !== confirm) {
			showAlert('confirmation password do not match', 'alerta-error');
			return;
		}

		userRegister({
			name,
			email,
			password
		});
	}

	return ( 
		<div className="form-usuario">
			{alert ? (<div className={`alerta ${alert.categoria}`}>{alert.msg}</div>) : null}
			<div className="contenedor-form sombra-dark">
				<h1> Sign up </h1>
				<form
					onSubmit={onSubmit}
				>
					<div className="campo-form">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							value={name}
							onChange={onChange}
							/>
					</div>
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
						<label htmlFor="confirm">Confirm Password</label>
						<input
							type="password"
							id="confirm"
							name="confirm"
							placeholder="Confirm Password"
							value={confirm}
							onChange={onChange}
							/>
					</div>
					<div className="campo-form">
						<input 
						type="submit"
						className="btn btn-primario btn-block"
						value="Sign Up"
						/>
					</div>
				</form>
				<Link to={'/'} className="enlace-cuenta">
					Back to login
				</Link>
			</div>
		</div>
	 );
}
 
export default Newacc;