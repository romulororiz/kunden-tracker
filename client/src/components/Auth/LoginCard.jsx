import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, loginUser } from '@features/auth/authSlice';
import LoginSvg from '@assets/svgs/login.svg';
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

		// dispatch login action from store
		dispatch(loginUser(userData));
	};

	// Handle loading - Spinner
	if (isLoading) return 'Loading..';

	return (
		<div className='login-card'>
			<div className='login-card__img-wrapper'>
				<img src={LoginSvg} alt='Login' className='login-card__image' />
				<h2 className='login-card__title'>Login</h2>
			</div>
			<form className='login-card__form'>
				<label className='login-card__label'>Email</label>
				<input
					className='login-card__input'
					type='email'
					name='email'
					value={email}
					required
					onChange={handleChange}
				/>
				<br />
				<label className='login-card__label'>Password</label>
				<input
					className='login-card__input'
					type='password'
					name='password'
					value={password}
					required
					onChange={handleChange}
				/>
				<br />
				<button
					className='login-card__button'
					type='submit'
					onClick={handleSubmit}
				>
					Login
				</button>
			</form>
			<span className='login-card__register'>
				Don't have an account? <a href='/register'>Register</a>
			</span>
		</div>
	);
};
export default LoginCard;
