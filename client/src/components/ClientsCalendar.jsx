import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import { useEffect } from 'react';
import { getClients } from '@features/clients/clientSlice';
import 'react-calendar/dist/Calendar.css';
import '@styles/scss/ClientsCalendar.scss';

const ClientsCalendar = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [clientsToDisplay, setClientsToDisplay] = useState([]);

	const { clients } = useSelector(state => state.client);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);

	useEffect(() => {
		// filter clients for selected date and set to state
		const selectedClients = clients.filter(client => {
			return client.workingHours.some(workingHour => {
				return moment(workingHour.day).isSame(selectedDate, 'day');
			});
		});
		setClientsToDisplay(selectedClients);
	}, [clients, selectedDate]);

	const tileClassName = ({ date, view }) => {
		// check if there is any client with working hour on the selected date
		const clientsWithWorkingHour = clients.filter(client => {
			return client.workingHours.some(workingHour =>
				moment(workingHour.day).isSame(date, 'day')
			);
		});

		if (clientsWithWorkingHour.length > 0) {
			return 'highlighted';
		}
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<Calendar
				locale='en-US'
				onClickDay={handleDateChange}
				value={selectedDate}
				tileClassName={tileClassName}
				onActiveStartDateChange={() => setClientsToDisplay([])}
			/>
			<div className='calendar__clients-container'>
				{clientsToDisplay.map(client => (
					<div key={client._id} className='calendar__client-item'>
						<h3>
							{client.firstName} {client.lastName}
						</h3>
						<p>
							{client.address.street}, {client.address.houseNumber},{' '}
							{client.address.city} - {client.address.postalCode}
						</p>
						{/* Filter working hour for the selected date */}
						{client.workingHours.map(
							workingHour =>
								moment(workingHour.day).isSame(selectedDate, 'day') && (
									<ul key={workingHour._id}>
										<li>
											{moment(workingHour.day).format('dddd - DD/MM/YYYY')}{' '}
											{moment(workingHour.startTime).format('HH:mm')} -{' '}
											{moment(workingHour.endTime).format('HH:mm')}
										</li>
									</ul>
								)
						)}
					</div>
				))}
			</div>
		</>
	);
};
export default ClientsCalendar;
