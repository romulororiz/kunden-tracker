import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@features/auth/authSlice';
import RegisterSvg from '@assets/svgs/register.svg';
import '@styles/scss/RegisterCard.scss';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { useUserRegisterMutation } from '@features/auth/authApi';

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
	const [userRegister, { data, isSuccess, isError, error, isLoading }] =
		useUserRegisterMutation();

	// Initialize dispatch and navigate
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(error.data.message);
		}

		// Redirect on success
		if (isSuccess) {
			dispatch(registerUser(data));
			navigate('/dashboard');
		}
	}, [dispatch, isError, isSuccess, navigate, isLoading, error, data]);

	const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		// Check if passwords match
		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			// submit form data to server
			const userData = {
				firstName,
				lastName,
				email,
				password,
			};

			// dispatch register action from store
			await userRegister(userData);

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
	if (isLoading) return <Spinner />;

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
							placeholder='First Name'
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
							placeholder='Last Name'
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
					placeholder='Email'
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
					placeholder='Password'
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
					placeholder='Confirm Password'
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
				Already have an account? <Link to='/login'>Sign in</Link>
			</span>
		</div>
	);
};
export default RegisterCard;
