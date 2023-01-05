import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import './App.css';
import Login from './pages/Login';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' exact element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
