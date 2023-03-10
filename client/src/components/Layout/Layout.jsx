import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import useWindowSize from '@hooks/useWindowSize';
import { useEffect, useState } from 'react';
import '@styles/scss/Layout.scss';
import Footer from './Footer';

const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	// Get user
	const { user } = useSelector(state => state.auth);

	// Handle close on resize
	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width <= 760) {
			setShowSidebar(false);
		} else {
			setShowSidebar(true);
		}
	}, [windowSize]);

	return (
		<div className='layout'>
			<Sidebar showSidebar={showSidebar} />
			<Header
				user={user}
				setShowSidebar={setShowSidebar}
				showSidebar={showSidebar}
			/>
			<div className='main__container'>
				<main className={`main ${showSidebar ? '' : 'main__no-sidebar'}`}>
					<Outlet />
				</main>
			</div>
			<Footer showSidebar={showSidebar} />
		</div>
	);
};

export default Layout;
