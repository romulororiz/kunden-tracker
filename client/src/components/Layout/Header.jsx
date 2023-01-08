import React from 'react';
import '@styles/scss/Header.scss';

const Header = ({ user }) => {
	return (
		<div className='header'>
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
