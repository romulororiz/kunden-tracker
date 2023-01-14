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

	// const recurrentTiles = clients
	// 	.filter(client => client.isRecurrent)
	// 	.map(client =>
	// 		client.workingHours.map(workingHour => {
	// 			const dayOfWeek = moment(workingHour.day).format('dddd'); //friday
	// 			return {
	// 				day: dayOfWeek,
	// 				className: 'calendar__recurrent',
	// 			};
	// 		})
	// 	)
	// 	.flat(); //flatten the array

	const tileClassName = ({ date, view }) => {
		// check if there is any client with working hour on the selected date
		const clientsWithWorkingHour = clients.filter(client => {
			return client.workingHours.some(workingHour =>
				moment(workingHour.day).isSame(date, 'day')
			);
		});

		if (clientsWithWorkingHour.length > 0) {
			return 'calendar__non-recurrent';
		}

		// For recurrent clients
		// 	const day = moment(date).format('dddd');
		// 	const match = recurrentTiles.find(tile => tile.day === day);
		// 	if (match) {
		// 		// calculate the end date for the recurrent period
		// 		const endDate = moment(match.startDate).add(4, 'weeks'); //Make it dyanmic when adding the client, select how many weeks
		// 		if (moment(date).isBetween(match.startDate, endDate, 'day', '[]')) {
		// 			return match.className;
		// 		}
		// 	}
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<div>
			<Calendar
				locale='en-US'
				onClickDay={handleDateChange}
				value={selectedDate}
				tileClassName={tileClassName}
				onActiveStartDateChange={() => setClientsToDisplay([])}
			/>
			<div>
				{clientsToDisplay.map(client => (
					<div key={client._id}>
						<h3>
							{client.firstName} {client.lastName}
						</h3>
						<p>
							{client.address.street}, {client.address.houseNumber},{' '}
							{client.address.city} - {client.address.postalCode}
						</p>
						{client.workingHours.map(
							workingHour =>
								moment(workingHour.day).isSame(selectedDate, 'day') && (
									<div key={workingHour._id}>
										<p>
											{moment(workingHour.day).format('dddd - DD/MM/YYYY')}{' '}
											{moment(workingHour.startTime).format('HH:mm')} -{' '}
											{moment(workingHour.endTime).format('HH:mm')}
										</p>
									</div>
								)
						)}
					</div>
				))}
			</div>
		</div>
	);
};
export default ClientsCalendar;
