import '@/styles/scss/Dashboard.scss';
import ClientsCalendar from '@components/ClientsCalendar';

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<div className='dashboard__calendar '>
				<ClientsCalendar />
			</div>
			<div className='dashboard__hour-counter'>
				<h2>Hour Counter per month widget</h2>
			</div>
		</div>
	);
};
export default Dashboard;
