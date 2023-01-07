import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClients } from '../features/clients/clientSlice';

const Dashboard = () => {
	const { clients } = useSelector(state => state.client);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);

	return (
		<div>
			<h2>Dashboard</h2>
			<ul>
				{clients.map((client, idx) => (
					<li key={idx}>{client.firstName}</li>
				))}
			</ul>
		</div>
	);
};
export default Dashboard;
