import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiSendPlaneFill } from 'react-icons/ri';
import Spinner from '@components/Spinner';
import { addClient, updateClient } from '@features/clients/clientSlice';
import { useEffect } from 'react';
import '@styles/scss/Modal.scss';

const Modal = ({ onClose, isUpdate, clientId }) => {
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
	const [updatingClient, setUpdatingClient] = useState(
		isUpdate
			? {
					firstName: '',
					lastName: '',
					address: {
						city: '',
						street: '',
						houseNumber: '',
						postalCode: '',
					},
					workingHours: [
						{
							day: '',
							startTime: '',
							endTime: '',
						},
					],
			  }
			: null
	);

	const dispatch = useDispatch();
	// const navigate = useNavigate();

	const { isLoading, clients } = useSelector(state => state.client);

	// If is updating, set the client thats being updated to state
	useEffect(() => {
		if (isUpdate) {
			const selectedClient = clients.find(client => client._id === clientId);
			setUpdatingClient(selectedClient);
		}
	}, [clientId, clients, isUpdate]);

	// Handle close on esc key press
	useEffect(() => {
		const close = e => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [onClose]);

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
			toast.error('Date and times are required');
			return;
		}

		setWorkingHours([...workingHours, newWorkingHours]);

		// If isUpdating, remove from client thats being updated
		if (isUpdate) {
			setUpdatingClient({
				...updatingClient,
				workingHours: [...updatingClient.workingHours, newWorkingHours],
			});
		}
	};

	// Remove workingHours obj from array
	const handleRemoveWorkingHoursClick = idx => {
		setWorkingHours(workingHours.filter((_, i) => i !== idx));

		// If isUpdating, remove from client thats being updated
		if (isUpdate) {
			setUpdatingClient({
				...updatingClient,
				workingHours: updatingClient.workingHours.filter((_, i) => i !== idx),
			});
		}
	};

	// Handle change on updating a client
	const handleUpdatingClient = e => {
		const { name, value } = e.target;

		if (isUpdate) {
			if (name === 'firstName' || name === 'lastName') {
				setUpdatingClient({
					...updatingClient,
					[name]: value,
				});
			} else {
				const nameArray = name.split('.');
				if (nameArray.length > 1) {
					const obj = { ...updatingClient };
					let nestedObj = obj;
					nameArray.forEach((key, i) => {
						if (i === nameArray.length - 1) {
							nestedObj[key] = value;
						} else {
							nestedObj[key] = { ...nestedObj[key] };
							nestedObj = nestedObj[key];
						}
					});
					setUpdatingClient(obj);
				}
			}
		}
	};

	// Submit new Client
	const handleSubmit = e => {
		e.preventDefault();

		if (
			!day ||
			!startTime ||
			!endTime ||
			!firstName ||
			!lastName ||
			!city ||
			!street ||
			!houseNumber ||
			!postalCode
		) {
			toast.error('Please fill in all the fields');
			return;
		}

		// Check working hours array has at least one item
		if (!workingHours.length) {
			toast.error('Please add a working time');
			return;
		}

		const clientData = {
			firstName,
			lastName,
			address: { city, street, houseNumber, postalCode },
			workingHours,
		};

		dispatch(addClient(clientData));

		// Close modal on submit
		onClose();
	};

	// Handle submit for updating a client
	const handleUpdateSubmit = e => {
		e.preventDefault();

		// Check working hours array has at least one item
		if (!updatingClient.workingHours.length) {
			toast.error('Please add a working time');
			return;
		}

		const {
			firstName,
			lastName,
			address: { city, street, houseNumber, postalCode },
			workingHours,
		} = updatingClient;

		const clientData = {
			firstName,
			lastName,
			address: {
				city,
				street,
				houseNumber,
				postalCode,
			},
			workingHours,
		};

		dispatch(updateClient({ clientId: clientId, clientData }));

		// Close modal on submit
		onClose();
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='modal__overlay'>
			<div className='modal__content'>
				<h4 className='modal__title'>
					{isUpdate ? 'Update Client' : 'Add a New Client'}
				</h4>
				<FaWindowClose className='modal__close' onClick={onClose} />
				<form onSubmit={handleSubmit}>
					<div className='modal__group'>
						<div className='modal__form-group'>
							<label htmlFor='firstName'>First Name</label>
							<input
								type='text'
								name='firstName'
								value={updatingClient ? updatingClient.firstName : firstName}
								onChange={
									isUpdate
										? handleUpdatingClient
										: e => setFirstName(e.target.value)
								}
							/>
						</div>
						<div className='modal__form-group'>
							<label htmlFor='lastName'>Last Name</label>
							<input
								type='text'
								name='lastName'
								value={updatingClient ? updatingClient.lastName : lastName}
								onChange={
									isUpdate
										? handleUpdatingClient
										: e => setLastName(e.target.value)
								}
							/>
						</div>
					</div>
					<div className='modal__form-group'>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							name={'address.city'}
							value={updatingClient ? updatingClient.address.city : city}
							onChange={
								isUpdate ? handleUpdatingClient : e => setCity(e.target.value)
							}
						/>
					</div>
					<div className='modal__group'>
						<div className='modal__form-group'>
							<label htmlFor='street'>Street</label>
							<input
								type='text'
								name='address.street'
								value={updatingClient ? updatingClient.address.street : street}
								onChange={
									isUpdate
										? handleUpdatingClient
										: e => setStreet(e.target.value)
								}
							/>
						</div>
						<div className='modal__form-group'>
							<label htmlFor='houseNumber'>House Number</label>
							<input
								type='number'
								name='address.houseNumber'
								value={
									updatingClient
										? updatingClient.address.houseNumber
										: houseNumber
								}
								onChange={
									isUpdate
										? handleUpdatingClient
										: e => setHouseNumber(e.target.value)
								}
							/>
						</div>
					</div>
					<div className='modal__form-group'>
						<label htmlFor='postalCode'>Postal Code</label>
						<input
							type='number'
							name='address.postalCode'
							value={
								updatingClient ? updatingClient.address.postalCode : postalCode
							}
							onChange={
								isUpdate
									? handleUpdatingClient
									: e => setPostalCode(e.target.value)
							}
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

				<div className='wrapper'>
					{isUpdate
						? updatingClient.workingHours.map((workingHour, index) => (
								<div key={index} className='modal__working-hours-item'>
									<div className='modal__working-hours-times'>
										<span>{moment(workingHour.day).format('DD/MM/YYYY')} </span>
										<span>{moment(workingHour.startTime).format('HH:mm')}</span>
										<span>{moment(workingHour.endTime).format('HH:mm')}</span>
									</div>

									<IoIosCloseCircleOutline
										onClick={() => handleRemoveWorkingHoursClick(index)}
										className='modal__remove-hour'
									/>
								</div>
						  ))
						: workingHours.map((workingHour, index) => (
								<div key={index} className='modal__working-hours-item'>
									<div className='modal__working-hours-times'>
										<span>{moment(workingHour.day).format('DD/MM/YYYY')} </span>
										<span>{moment(workingHour.startTime).format('HH:mm')}</span>
										<span>{moment(workingHour.endTime).format('HH:mm')}</span>
									</div>

									<IoIosCloseCircleOutline
										onClick={() => handleRemoveWorkingHoursClick(index)}
										className='modal__remove-hour'
									/>
								</div>
						  ))}
				</div>
				<button
					type='submit'
					onClick={isUpdate ? handleUpdateSubmit : handleSubmit}
					className='modal__submit'
				>
					<RiSendPlaneFill className='modal__submit-icon' />
					{isUpdate ? 'Update' : 'Submit'}
				</button>
			</div>
		</div>
	);
};

export default Modal;
