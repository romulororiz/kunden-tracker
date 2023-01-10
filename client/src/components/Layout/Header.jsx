import React from 'react';
import '@styles/scss/Header.scss';

const Header = ({ user, setShowSidebar, showSidebar }) => {
	return (
		<div className='header'>
			<div
				className={`sidebar__burger ${
					showSidebar ? '' : 'sidebar__burger-no-sidebar'
				}`}
			>
				{/* <div className='burger' onClick={() => setShowSidebar(!showSidebar)}>
					{showSidebar ? 'close' : 'open'}
				</div> */}

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
				<div></div>
			</div>
		</div>
	);
};

export default Header;
