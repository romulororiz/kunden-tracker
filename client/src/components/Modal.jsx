import '@styles/scss/Modal.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import Spinner from '@components/Spinner';
import { addClient, reset, getClients } from '../features/clients/clientSlice';

const Modal = ({ isOpen, onClose }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [day, setDay] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [workingHours, setWorkingHours] = useState([]);

	const dispatch = useDispatch();

	const { isError, isSuccess, isLoading, message } = useSelector(
		state => state.client
	);

	const handleAddWorkingHoursClick = () => {
		const newWorkingHours = {
			day,
			startTime: moment(day)
				.set({
					hour: moment(startTime, 'HH:mm').hours(),
					minute: moment(startTime, 'HH:mm').minutes(),
				})
				.toISOString(),
			endTime: moment(day)
				.set({
					hour: moment(endTime, 'HH:mm').hours(),
					minute: moment(endTime, 'HH:mm').minutes(),
				})
				.toISOString(),
		};

		setWorkingHours([...workingHours, newWorkingHours]);
		setDay('');
		setStartTime('');
		setEndTime('');
	};

	const handleRemoveWorkingHoursClick = idx => {
		setWorkingHours(workingHours.filter((_, i) => i !== idx));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		return () => {
			if (isSuccess) {
				return dispatch(reset());
			}
		};
	}, [dispatch, isError, isSuccess, message]);

	const handleSubmit = e => {
		e.preventDefault();

		const clientData = {
			firstName,
			lastName,
			city,
			street,
			houseNumber,
			postalCode,
			workingHours,
		};
		dispatch(addClient(clientData));
		dispatch(getClients());
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='modal'>
			<div className='modal__content'>
				<button type='button'>Close</button>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='firstName'>First Name</label>
						<input
							type='text'
							name='firstName'
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='lastName'>Last Name</label>
						<input
							type='text'
							name='lastName'
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							name='city'
							value={city}
							onChange={e => setCity(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='street'>Street</label>
						<input
							type='text'
							name='street'
							value={street}
							onChange={e => setStreet(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='houseNumber'>House Number</label>
						<input
							type='text'
							name='houseNumber'
							value={houseNumber}
							onChange={e => setHouseNumber(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='postalCode'>Postal Code</label>
						<input
							type='text'
							name='postalCode'
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='day'>Day</label>
						<input
							type='date'
							name='day'
							value={day}
							onChange={e => setDay(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='startTime'>Start Time</label>
						<input
							type='time'
							id='startTime'
							value={startTime}
							onChange={e => setStartTime(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='endTime'>End Time</label>
						<input
							type='time'
							id='endTime'
							value={endTime}
							onChange={e => setEndTime(e.target.value)}
						/>
					</div>
					<button type='submit'>Add client</button>
				</form>
				<button type='button' onClick={handleAddWorkingHoursClick}>
					Add Working Hours
				</button>
				{workingHours.map((workingHour, index) => (
					<div key={index} className='working-hours__item'>
						<p>{workingHour.day}</p>
						<p>{workingHour.startTime}</p>
						<p>{workingHour.endTime}</p>
						<button
							type='button'
							onClick={() => handleRemoveWorkingHoursClick(index)}
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Modal;
