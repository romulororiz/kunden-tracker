import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Register from '@pages/Register';
import Dashboard from '@components/Dashboard';
import Clients from '@components/Clients';
import Login from '@pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/scss/Layout.scss';
import SidebarLayout from './components/SidebarLayout';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route element={<SidebarLayout />}>
						<Route path='/' element={<PrivateRoute />}>
							<Route
								exact
								path='/'
								element={<Navigate to='/dashboard' />}
							></Route>
						</Route>
						<Route path='/dashboard' element={<PrivateRoute />}>
							<Route path='/dashboard' element={<Dashboard />} />
						</Route>
						<Route path='/clients' element={<PrivateRoute />}>
							<Route path='/clients' element={<Clients />} />
						</Route>
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
