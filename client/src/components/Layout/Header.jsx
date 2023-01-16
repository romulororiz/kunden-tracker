import React from 'react';
import '@styles/scss/Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@features/auth/authSlice';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const Header = ({ user, setShowSidebar, showSidebar }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// logout user
	const submitHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div className='header'>
			<div
				className={`sidebar__burger ${
					showSidebar ? '' : 'sidebar__burger-no-sidebar'
				}`}
			>
				<input
					id='sidebar__toggle'
					type='checkbox'
					checked={showSidebar}
					onChange={() => setShowSidebar(!showSidebar)}
				/>
				<label
					className={`sidebar__burger ${
						showSidebar ? '' : 'sidebar__burger-no-sidebar'
					}`}
					htmlFor='sidebar__toggle'
				>
					<span></span>
				</label>
			</div>
			<div className='header__items-wrapper'>
				<div className='header__user-info'>
					<h3>Hello, {user && user.firstName}</h3>
				</div>
				<div className='header__logout'>
					<Link className='header__logout-link' onClick={submitHandler}>
						<span className='header__logout-text'>Logout</span>
						<MdLogout className='header__logout-icon' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
