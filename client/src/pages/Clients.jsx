import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import { deleteClient, getClients } from '../features/clients/clientSlice';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import ClientsTable from '../components/Layout/ClientsTable';
import Spinner from '@components/Spinner';
import '@styles/scss/ClientsTable.scss';
import '@styles/scss/Clients.scss';
import Tooltip from '../components/Tooltip';

const Clients = () => {
	const [query, setQuery] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const dispatch = useDispatch();

	// get clients from state
	const { clients, isLoading, isError, isSuccess, message } = useSelector(
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

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getClients());
	}, [dispatch, isError, isSuccess, message]);

	const handleDelete = useCallback(() => {
		const clientID = document
			.querySelector('.table__action-delete')
			.getAttribute('data-id');

		dispatch(deleteClient(clientID));
	}, [dispatch]);

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
						hour12: true,
					}).format(new Date(workingHour.startTime));
					const endTime = new Intl.DateTimeFormat('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: true,
					}).format(new Date(workingHour.endTime));
					return (
						<ul key={index}>
							<li>
								<span className='day'>{dayOfWeek}:</span>{' '}
								<div className='times'>
									{startTime} - {endTime}
								</div>
							</li>
						</ul>
					);
				}),
				actions: (
					<div className='table__action' key={index}>
						<FaTrashAlt
							data-id={client._id}
							onClick={handleDelete}
							className='table__action-icon table__action-delete'
						/>
						<BsPencilSquare
							data-id={client._id}
							className='table__action-icon table__action-update'
						/>
					</div>
				),
			})),
		[clients, handleDelete]
	);

	if (isLoading) return <Spinner />;

	return (
		<div className='clients'>
			{clients.length > 0 ? (
				<>
					<div className='clients__actions'>
						<Tooltip name='Add new client'>
							<button type='submit' className='client__add-btn'>
								+
							</button>
						</Tooltip>
						{/* <span className='client__tooltip'>Add new client</span> */}
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
					You have no clients to display. <span>Add a new client</span>
				</p>
			)}
		</div>
	);
};

export default Clients;
