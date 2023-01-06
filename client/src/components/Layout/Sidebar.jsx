import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

	// set current screen size
	useEffect(() => {
		setWindowDimension(windowSize.width);
	}, [windowDimension, windowSize.width]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				<a href='/#' className='sidebar__link'>
					<TiHomeOutline className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Dashboard</span>
				</a>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Content</div>
				<a href='/#' className='sidebar__link'>
					<HiOutlineUsers className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Clients</span>
				</a>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>
					{windowDimension <= 720 ? 'Custom.' : 'Customization'}
				</div>
				<a href='/#' className='sidebar__link'>
					<RiMarkupLine className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Theme</span>
				</a>
			</div>
			<div className='sidebar__section sidebar__section-logout'>
				<div className='sidebar__section-title'>Logout</div>
				<a
					href='/#'
					className='sidebar__link'
					type='submit'
					onClick={submitHandler}
				>
					<BiLogOut className='sidebar__link-icon' />
					<span className='sidebar__link-text'>Logout</span>
				</a>
			</div>
		</aside>
	);
};
export default Sidebar;
