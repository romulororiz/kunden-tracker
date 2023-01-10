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

const Clients = () => {
	const [query, setQuery] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const dispatch = useDispatch();

	// get clients from state
	const { clients, isLoading, isSuccess } = useSelector(state => state.client);

	// table keys to get filtered by
	const keys = ['name', 'address'];

	// Filter on query
	const search = data => {
		return data.filter(item =>
			keys.some(key => item[key].toLowerCase().includes(query))
		);
	};

	useEffect(() => {
		return () => {
			if (isSuccess) {
				return dispatch(reset());
			}
		};
	}, [dispatch, isSuccess, clients]);

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);

	const handleDelete = useCallback(
		id => {
			dispatch(deleteClient(id));
		},
		[dispatch]
	);

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
						<ul key={workingHour._id}>
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
							onClick={() => handleDelete(client._id)}
							className='table__action-icon table__action-delete'
						/>
						<BsPencilSquare className='table__action-icon table__action-update' />
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
					<Modal />
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
