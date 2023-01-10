import moment from 'moment';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiSendPlaneFill } from 'react-icons/ri';
import Spinner from '@components/Spinner';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { addClient } from '../features/clients/clientSlice';
import '@styles/scss/Modal.scss';

const Modal = ({ onClose }) => {
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
	const navigate = useNavigate();

	const { isLoading } = useSelector(state => state.client);

	// Handle close on click outside
	const modal = useRef(null);
	useOnClickOutside(modal, () => onClose());

	// Add new date & hours to working hours array
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

		if (
			!newWorkingHours.day ||
			!newWorkingHours.startTime ||
			!newWorkingHours.endTime
		) {
			toast.error('Please add the date and time');
			return;
		}

		setWorkingHours([...workingHours, newWorkingHours]);
	};

	// Remove workingHours obj from array
	const handleRemoveWorkingHoursClick = idx => {
		setWorkingHours(workingHours.filter((_, i) => i !== idx));
	};

	// Submit new Client
	const handleSubmit = e => {
		e.preventDefault();

		if (!day || !startTime || !endTime) {
			toast.error('Please fill in all the fields');
			return;
		}

		const clientData = {
			firstName,
			lastName,
			city,
			street,
			houseNumber,
			postalCode,
			workingHours,
		};

		// Close modal on submit
		onClose();

		dispatch(addClient(clientData));
		navigate(0);
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='modal__overlay'>
			<div className='modal__content' ref={modal}>
				<h4 className='modal__title'>Add a New Client</h4>
				<FaWindowClose className='modal__close' onClick={onClose} />
				<form onSubmit={handleSubmit}>
					<div className='modal__group'>
						<div className='modal__form-group'>
							<label htmlFor='firstName'>First Name</label>
							<input
								type='text'
								name='firstName'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</div>
						<div className='modal__form-group'>
							<label htmlFor='lastName'>Last Name</label>
							<input
								type='text'
								name='lastName'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className='modal__form-group'>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							name='city'
							value={city}
							onChange={e => setCity(e.target.value)}
						/>
					</div>
					<div className='modal__group'>
						<div className='modal__form-group'>
							<label htmlFor='street'>Street</label>
							<input
								type='text'
								name='street'
								value={street}
								onChange={e => setStreet(e.target.value)}
							/>
						</div>
						<div className='modal__form-group'>
							<label htmlFor='houseNumber'>House Number</label>
							<input
								type='text'
								name='houseNumber'
								value={houseNumber}
								onChange={e => setHouseNumber(e.target.value)}
							/>
						</div>
					</div>
					<div className='modal__form-group'>
						<label htmlFor='postalCode'>Postal Code</label>
						<input
							type='text'
							name='postalCode'
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
						/>
					</div>
					<div className='modal__group modal__group-times'>
						<div className='modal__form-group'>
							<label htmlFor='day'>Day</label>
							<input
								type='date'
								name='day'
								value={day}
								onChange={e => setDay(e.target.value)}
							/>
						</div>
						<div className='modal__form-group '>
							<label htmlFor='startTime'>Start Time</label>
							<input
								type='time'
								id='startTime'
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
							/>
						</div>
						<div className='modal__form-group'>
							<label htmlFor='endTime'>End Time</label>
							<input
								type='time'
								id='endTime'
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
							/>
						</div>
						<AiFillPlusCircle
							className='modal__add-hour'
							type='button'
							onClick={handleAddWorkingHoursClick}
						/>
					</div>
				</form>

				{workingHours.map((workingHour, index) => (
					<div key={index} className='modal__working-hours-item'>
						<div className='modal__working-hours-times'>
							<span>{moment(workingHour.day).format('DD/MM/YYYY')} </span>
							<span>{moment(workingHour.startTime).format('HH:mm')}</span>
							<span>{moment(workingHour.startTime).format('HH:mm')}</span>
						</div>

						<IoIosCloseCircleOutline
							onClick={() => handleRemoveWorkingHoursClick(index)}
							className='modal__remove-hour'
						/>
					</div>
				))}
				<button type='submit' onClick={handleSubmit} className='modal__submit'>
					<RiSendPlaneFill className='modal__submit-icon' />
					Submit
				</button>
			</div>
		</div>
	);
};

export default Modal;
