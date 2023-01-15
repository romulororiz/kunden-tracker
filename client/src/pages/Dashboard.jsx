import '@/styles/scss/Dashboard.scss';
import ClientsCalendar from '@components/ClientsCalendar';
import HourCounter from '../components/HourCounter';

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<div className='dashboard__hour-counter'>
				<HourCounter />
			</div>
			<div className='dashboard__calendar '>
				<ClientsCalendar />
			</div>
		</div>
	);
};
export default Dashboard;
