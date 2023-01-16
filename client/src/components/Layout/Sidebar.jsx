import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useWindowSize from '@hooks/useWindowSize';
import Logo from '@assets/svgs/logo.svg';
import { sidebarLinks } from '@config/data';
import '@styles/scss/Sidebar.scss';

const Sidebar = ({ showSidebar }) => {
	const [windowDimension, setWindowDimension] = useState(0);

	// Get window size
	const windowSize = useWindowSize();

	// Get current location
	const location = useLocation();

	// check for current path
	const isActive = path => {
		return location.pathname === path;
	};

	// set current screen size
	useEffect(() => {
		setWindowDimension(windowSize.width);
	}, [windowDimension, windowSize.width]);

	return (
		<aside className={`sidebar ${showSidebar ? '' : 'sidebar-hide'}`}>
			{windowDimension <= 760 ? (
				<h3 className='sidebar__logo sidebar__logo-text'>KT</h3>
			) : (
				<div className='sidebar__logo'>
					<img src={Logo} alt='Logo' className='sidebar__logo-image' />
				</div>
			)}

			{sidebarLinks.map(({ linkTitle, link, linkText, Icon }, index) => (
				<div key={index} className='sidebar__section'>
					<div className='sidebar__section-title'>{linkTitle}</div>
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
		</aside>
	);
};
export default Sidebar;
