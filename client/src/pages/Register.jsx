import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, reset } from '../features/auth/authSlice';

function Register() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const { firstName, lastName, email, password } = formData;

	// Get data from store
	const { user, isError, isLoading, isSuccess, message } = useSelector(
		state => state.auth
	);

	// Initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			alert('error');
		}

		// Redirect on success
		if (isSuccess || isError || user) {
			dispatch(reset());
			navigate('/');
		}

		dispatch(reset());
	}, []);

	const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();
		// submit form data to server
		const userData = {
			firstName,
			lastName,
			email,
			password,
		};

		dispatch(registerUser(userData));

		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				First Name:
				<input
					type='text'
					name='firstName'
					value={firstName}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<label>
				Last Name:
				<input
					type='text'
					name='lastName'
					value={lastName}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<label>
				Email:
				<input
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<label>
				Password:
				<input
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<button type='submit'>Sign Up</button>
		</form>
	);
}

export default Register;
