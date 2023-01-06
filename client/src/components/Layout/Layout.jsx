import Sidebar from './Sidebar';
import '@styles/scss/Layout.scss';

const Layout = ({ children }) => {
	return (
		<div className='layout'>
			<Sidebar />
			<main className='main'>{children}</main>
		</div>
	);
};
export default Layout;
