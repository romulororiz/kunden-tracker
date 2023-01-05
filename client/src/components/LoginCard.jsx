import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, loginUser } from '@features/auth/authSlice';
import '@styles/scss/LoginCard.scss';

const LoginCard = () => {
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
		<div className='login-card'>
			<form className='login-card__form'>
				<label className='login-card__label'>
					Email:
					<input
						className='login-card__input'
						type='email'
						name='email'
						value={email}
						required
						onChange={handleChange}
					/>
				</label>
				<br />
				<label className='login-card__label'>
					Password:
					<input
						className='login-card__input'
						type='password'
						name='password'
						value={password}
						required
						onChange={handleChange}
					/>
				</label>
				<br />
				<button
					className='login-card__button'
					type='submit'
					onClick={handleSubmit}
				>
					Login
				</button>
			</form>
		</div>
	);
};
export default LoginCard;
