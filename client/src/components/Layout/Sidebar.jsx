import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '@features/auth/authSlice';
import { BiLogOut } from 'react-icons/bi';
import useWindowSize from '../../hooks/useWindowSize';
import Logo from '@assets/svgs/logo.svg';
import { sidebarLinks } from '../../config/data';
import '@styles/scss/Sidebar.scss';

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

			{sidebarLinks.map(({ linkTitle, link, linkText, Icon }, index) => (
				<div key={index} className='sidebar__section'>
					<div className='sidebar__section-title'>
						{linkTitle === 'Customization' && windowDimension <= 720
							? 'Custom.'
							: linkTitle}
					</div>
					<Link
						to={link}
						className={`sidebar__link ${
							isActive(link) ? 'sidebar__link-active' : ''
						}`}
					>
						<Icon className='sidebar__link-icon' />
						<span className='sidebar__link-text'>{linkText}</span>
					</Link>
				</div>
			))}

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
