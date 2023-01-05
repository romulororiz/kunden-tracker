import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(logout());
	};

	return (
		<div>
			Dashboard
			<button onClick={handleClick}>Logout</button>
		</div>
	);
};
export default Dashboard;
