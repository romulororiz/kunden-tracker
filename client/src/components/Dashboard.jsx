import { useSelector } from "react-redux";

const Dashboard = () => {

	const { user } = useSelector(state => state.auth);

	console.log(user);
	

	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
};
export default Dashboard;
