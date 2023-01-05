import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div>
			<Layout>
				<button onClick={handleClick()}>Logout</button>
			</Layout>
		</div>
	);
};
export default Dashboard;
