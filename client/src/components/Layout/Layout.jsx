import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '@styles/scss/Layout.scss';
import Header from './Header';
import { useSelector } from 'react-redux';

const Layout = () => {
	const { user } = useSelector(state => state.auth);

	console.log(user);

	return (
		<div className='layout'>
			<Sidebar />
			<Header user={user} />
			<div className='main__container'>
				<main className='main'>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
