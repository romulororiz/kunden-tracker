import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, loginUser } from '../features/auth/authSlice';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	// Get data from store
	const { user, isError, isLoading, isSuccess, message } = useSelector(
		state => state.auth
	);

	// Initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			alert(message);
		}

		if (isSuccess || user) {
			dispatch(reset());
			navigate('/');
		}

		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate, user]);

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
			email,
			password,
		};

		dispatch(loginUser(userData));
	};

	// Handle loading - Spinner
	if (isLoading) return 'Loading..';

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email:
				<input
					type='email'
					name='email'
					value={formData.email}
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
					value={formData.password}
					onChange={handleChange}
					required
				/>
			</label>
			<br />
			<button type='submit'>Log In</button>
		</form>
	);
}

export default Login;
