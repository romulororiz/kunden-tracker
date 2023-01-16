import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginSvg from '@assets/svgs/login.svg';
import '@styles/scss/LoginCard.scss';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { useUserLoginMutation } from '@features/auth/authApi';
import { loginUser } from '@features/auth/authSlice';

const LoginCard = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	// Get login mutation
	const [userLogin, { data, isSuccess, isError, error, isLoading }] =
		useUserLoginMutation();

	// Initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// isError and isSuccess are responses from the login mutation
	// I can access the message field thats coming from the backend
	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}

		if (isSuccess) {
			dispatch(loginUser(data));
			navigate('/dashboard');
		}
	}, [data, dispatch, error, isError, isSuccess, navigate, isLoading]);

	const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		// submit form data to server
		const userData = {
			email,
			password,
		};

		// dispatch login action from store
		await userLogin(userData);
	};

	// Handle loading - Spinner
	if (isLoading) return <Spinner />;

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
					placeholder='Your email'
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
					placeholder='Your password'
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
				Don't have an account? <Link to='/register'>Register</Link>
			</span>
		</div>
	);
};
export default LoginCard;
