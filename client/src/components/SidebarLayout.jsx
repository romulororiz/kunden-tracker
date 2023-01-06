import { Outlet } from 'react-router-dom';
import Sidebar from './Layout/Sidebar';

const SidebarLayout = () => (
	<>
		<Sidebar />
		<div className='main__container'>
			<main className='main'>
				<Outlet />
			</main>
		</div>
	</>
);

export default SidebarLayout;
