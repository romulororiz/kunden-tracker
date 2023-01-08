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
import Layout from './components/Layout/Layout';
import { useSelector } from 'react-redux';

const App = () => {
	const user = useSelector(state => state.auth.user);

	return (
		<>
			<Router>
				<Routes>
					<Route element={<Layout />}>
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

					<Route
						path='/login'
						element={user ? <Navigate to='/dashboard' /> : <Login />}
					/>
					<Route
						path='/register'
						element={user ? <Navigate to='/dashboard' /> : <Register />}
					/>
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
