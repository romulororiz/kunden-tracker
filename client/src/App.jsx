import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '@pages/Register';
import Dashboard from '@components/Dashboard';
import Login from '@pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<PrivateRoute />}>
						<Route path='/' element={<Dashboard />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
