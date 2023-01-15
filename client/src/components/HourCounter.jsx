import '@styles/scss/HourCounter.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { convertMinutesToHours } from '../utils/convertMinutesToHours';

const HourCounterWidget = () => {
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [hoursWorked, setHoursWorked] = useState(0);
	const [minutesWorked, setMinutesWorked] = useState(0);
	const currentMonth = moment().format('MMMM');

	const { clients } = useSelector(state => state.client);

	useEffect(() => {
		let totalHours = 0;
		let totalMinutes = 0;
		clients.forEach(client => {
			client.workingHours.forEach(workingHour => {
				if (moment(workingHour.day).format('MMMM') === selectedMonth) {
					const start = moment(workingHour.startTime);
					const end = moment(workingHour.endTime);
					totalHours += end.diff(start, 'hours');
					totalMinutes += end.diff(start, 'minutes') % 60;
				}
			});
		});
		setHoursWorked(totalHours);
		setMinutesWorked(totalMinutes);
	}, [clients, selectedMonth]);

	const months = moment.months();

	return (
		<div className='hour-counter__all-clients'>
			<div className='hour-counter__all-clients-months'>
				<select
					defaultValue={currentMonth}
					onChange={e => setSelectedMonth(e.target.value)}
				>
					{months.map((month, index) => (
						<option key={index} value={month}>
							{month}
						</option>
					))}
				</select>
			</div>
			<div className='hour-counter__all-clients-hour'>
				<span>{convertMinutesToHours(hoursWorked, minutesWorked)}</span> hours
				worked in {selectedMonth ? selectedMonth : currentMonth}
			</div>
		</div>
	);
};

export default HourCounterWidget;
