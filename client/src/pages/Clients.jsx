import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import { deleteClient, getClients, reset } from '@features/clients/clientSlice';
import { useMemo } from 'react';
import ClientsTable from '@components/Layout/ClientsTable';
import Spinner from '@components/Spinner';
import '@styles/scss/ClientsTable.scss';
import '@styles/scss/Clients.scss';
import Tooltip from '@components/Tooltip';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';

const Clients = () => {
	const [query, setQuery] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [selectedClientId, setSelectedClientId] = useState(null);

	const dispatch = useDispatch();

	// get clients from state
	const { clients, isLoading, isSuccess, isError, message } = useSelector(
		state => state.client
	);

	console.log(clients);

	// table keys to get filtered by
	const keys = ['name', 'address'];

	// Filter on query
	const search = data => {
		return data.filter(item =>
			keys.some(key => item[key].toLowerCase().includes(query))
		);
	};

	// If success reset state
	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess, clients, isError, message]);

	// Get clients on first render
	useEffect(() => {
		const fetchClients = async () => {
			await dispatch(getClients());
		};

		fetchClients();
	}, [dispatch]);

	// Delete client on ID
	const handleDelete = useCallback(
		id => {
			dispatch(deleteClient(id));
		},
		[dispatch]
	);

	// Close modal and if its updating mode, set it to false
	const handleCloseModal = () => {
		setModalIsOpen(false);
		setSelectedClientId(null);

		if (isUpdate) {
			setIsUpdate(false);
		}
	};

	// Set update mode to true and pass clientID to update
	const handleUpdate = clientId => {
		setIsUpdate(true);
		setSelectedClientId(clientId);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Address',
				accessor: 'address',
			},
			{
				Header: 'Working Hours',
				accessor: 'workingHours',
			},
			{
				Header: 'Actions',
				accessor: 'actions',
			},
		],
		[]
	);

	const data = useMemo(
		() =>
			clients.map((client, index) => ({
				name: `${client.firstName} ${client.lastName}`,
				address: `${client.address.street}, ${client.address.houseNumber} - ${client.address.postalCode} - ${client.address.city}`,
				workingHours: client.workingHours.map(workingHour => {
					const dayOfWeek = new Intl.DateTimeFormat('en-US', {
						weekday: 'long',
					}).format(new Date(workingHour.day));
					const startTime = new Intl.DateTimeFormat('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: false,
					}).format(new Date(workingHour.startTime));
					const endTime = new Intl.DateTimeFormat('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: false,
					}).format(new Date(workingHour.endTime));
					return (
						<ul key={workingHour._id}>
							<li key={index}>
								<span className='day'>{dayOfWeek}:</span>{' '}
								<div className='times'>
									{startTime} {startTime >= '12' ? 'pm' : 'am'} - {endTime}{' '}
									{endTime >= '12' ? 'pm' : 'am'}
								</div>
							</li>
						</ul>
					);
				}),
				actions: (
					<div className='table__action' key={client._id}>
						<FaTrashAlt
							onClick={() => handleDelete(client._id)}
							className='table__action-icon table__action-delete'
						/>
						<BsPencilSquare
							className='table__action-icon table__action-update'
							onClick={() => handleUpdate(client._id)}
						/>
					</div>
				),
			})),
		[clients, handleDelete]
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			{modalIsOpen || isUpdate ? (
				<Modal
					onClose={handleCloseModal}
					isUpdate={isUpdate}
					clientId={selectedClientId}
				/>
			) : null}
			<div className='clients'>
				{clients.length > 0 ? (
					<>
						<div className='clients__actions'>
							<Tooltip name='Add new client'>
								<button
									type='button'
									className='client__add-btn'
									onClick={() => setModalIsOpen(true)}
								>
									+
								</button>
							</Tooltip>
							<input
								type='text'
								placeholder='Search'
								onChange={e => setQuery(e.target.value)}
								className='client__filter'
							/>
						</div>
						<ClientsTable
							columns={columns}
							data={search(data)}
							clients={clients}
						/>
					</>
				) : (
					<p className='clients__message'>
						You have no clients to display.{' '}
						<span onClick={() => setModalIsOpen(true)}>Add a new client</span>
					</p>
				)}
			</div>
		</>
	);
};

export default Clients;
