import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Register from '@pages/Register';
import Dashboard from '@components/Dashboard';
import Login from '@pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
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
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
