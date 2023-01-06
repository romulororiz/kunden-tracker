import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '@features/auth/authSlice';
import { TiHomeOutline } from 'react-icons/ti';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiMarkupLine } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import useWindowSize from '../../hooks/useWindowSize';
import '@styles/scss/Sidebar.scss';
import Logo from '@assets/svgs/logo.svg';

const Sidebar = () => {
	const [windowDimension, setWindowDimension] = useState(0);

	// Get window size
	const windowSize = useWindowSize();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// check for current path
	const isActive = path => {
		return location.pathname === path;
	};

	// set current screen size
	useEffect(() => {
		setWindowDimension(windowSize.width);
	}, [windowDimension, windowSize.width]);

	// logout user
	const submitHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<aside className='sidebar'>
			{windowDimension <= 720 ? (
				<h3 className='sidebar__logo sidebar__logo-text'>KT</h3>
			) : (
				<div className='sidebar__logo'>
					<img src={Logo} alt='Logo' className='sidebar__logo-image' />
				</div>
			)}
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Analytics</div>
				<Link
					to='/dashboard'
					className={`sidebar__link ${
						isActive('/dashboard') ? 'sidebar__link-active' : ''
					}`}
				>
					<TiHomeOutline className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Dashboard</span>
				</Link>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Content</div>
				<Link
					to='/clients'
					className={`sidebar__link ${
						isActive('/clients') ? 'sidebar__link-active' : ''
					}`}
				>
					<HiOutlineUsers className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Clients</span>
				</Link>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>
					{windowDimension <= 720 ? 'Custom.' : 'Customization'}
				</div>
				<Link
					to='/theme'
					className={`sidebar__link ${
						isActive('/theme') ? 'sidebar__link-active' : ''
					}`}
				>
					<RiMarkupLine className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Theme</span>
				</Link>
			</div>
			<div className='sidebar__section sidebar__section-logout'>
				<div className='sidebar__section-title'>Logout</div>
				<Link className='sidebar__link' type='submit' onClick={submitHandler}>
					<BiLogOut className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Logout</span>
				</Link>
			</div>
		</aside>
	);
};
export default Sidebar;
