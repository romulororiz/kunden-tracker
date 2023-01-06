import Logo from '@assets/svgs/logo.svg';
import '@styles/scss/Sidebar.scss';
import { TiHomeOutline } from 'react-icons/ti';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiMarkupLine } from 'react-icons/ri';

const Sidebar = () => {
	return (
		<aside className='sidebar'>
			<div className='sidebar__logo'>
				<img src={Logo} alt='Logo' className='sidebar__logo-image' />
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Analytics</div>
				<a href='#' className='sidebar__link'>
					<TiHomeOutline className='sidebar__link-icon' />
					Dashboard
				</a>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Content</div>
				<a href='#' className='sidebar__link'>
					<HiOutlineUsers className='sidebar__link-icon' />
					Clients
				</a>
			</div>
			<div className='sidebar__section'>
				<div className='sidebar__section-title'>Customization</div>
				<a href='#' className='sidebar__link'>
					<RiMarkupLine className='sidebar__link-icon' />
					Theme
				</a>
			</div>
		</aside>
	);
};
export default Sidebar;
