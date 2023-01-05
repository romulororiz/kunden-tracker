import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, registerUser } from '@features/auth/authSlice';
import RegisterSvg from '@assets/svgs/register.svg';
import '@styles/scss/RegisterCard.scss';
// import { useNotificationContext } from '@hooks/useNotificationContext';

const RegisterCard = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	});

	const { firstName, lastName, email, password, password2 } = formData;

	// Get data from store
	const { user, isError, isLoading, isSuccess, message } = useSelector(
		state => state.auth
	);

	// // Get state from context to handle input errors
	// const { errorMessage, hasError, updateMessage, updateHasError } =
	// 	useNotificationContext();

	// Initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			alert(message);
		}

		// Redirect on success
		if (isSuccess || user) {
			dispatch(reset());
			navigate('/');
		}

		dispatch(reset());
	}, [dispatch, user, isError, isSuccess, message, navigate]);

	const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = event => {
		event.preventDefault();

		// Check if passwords match
		if (password !== password2) {
			alert('Passwords do not match');
		} else {
			// submit form data to server
			const userData = {
				firstName,
				lastName,
				email,
				password,
			};

			// dispatch register action from store
			dispatch(registerUser(userData));

			// clear form
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				password2: '',
			});
		}
	};

	// Handle loading - Spinner
	if (isLoading) return 'Loading..';

	return (
		<div className='register-card'>
			<form className='register-card__form'>
				<div className='register-card__img-wrapper'>
					<img
						src={RegisterSvg}
						alt='Register'
						className='register-card__image'
					/>
					<h2 className='register-card__title'>Register</h2>
				</div>
				<div className='register-card__name_wrapper'>
					<div className='register-card__form-group'>
						<label className='register-card__label'>First Name</label>
						<input
							className='register-card__input'
							type='firstName'
							name='firstName'
							value={firstName}
							required
							onChange={handleChange}
						/>
					</div>
					<div className='register-card__form-group'>
						<label className='register-card__label'>Last Name</label>
						<input
							className='register-card__input'
							type='lastName'
							name='lastName'
							value={lastName}
							required
							onChange={handleChange}
						/>
					</div>
				</div>
				<br />
				<label className='register-card__label'>Email</label>
				<input
					className='register-card__input'
					type='email'
					name='email'
					value={email}
					required
					onChange={handleChange}
				/>
				<br />

				<label className='register-card__label'>Password</label>
				<input
					className='register-card__input'
					type='password'
					name='password'
					value={password}
					required
					onChange={handleChange}
				/>
				<br />

				<label className='register-card__label'>Confirm Password</label>
				<input
					className='register-card__input'
					type='password'
					name='password2'
					value={password2}
					required
					onChange={handleChange}
				/>
				<br />

				<button
					className='register-card__button'
					type='submit'
					onClick={handleSubmit}
				>
					Register
				</button>
			</form>
			<span className='register-card_sign-in'>
				Already have an account? <a href='/login'>Sign in</a>
			</span>
		</div>
	);
};
export default RegisterCard;
