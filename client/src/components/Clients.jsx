import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getClients } from '../features/clients/clientSlice';
import { useMemo } from 'react';
import ClientsTable from './Layout/ClientsTable';
import Spinner from '@components/Spinner';
import '@styles/scss/ClientsTable.scss';
import '@styles/scss/Clients.scss';

const Clients = () => {
	const [query, setQuery] = useState('');

	const dispatch = useDispatch();

	// get clients from state
	const { clients, isLoading, isError, isSuccess, message } = useSelector(
		state => state.client
	);

	console.log(clients);

	// table keys
	const keys = ['name', 'address'];

	// Filter on query
	const search = data => {
		return data.filter(item =>
			keys.some(key => item[key].toLowerCase().includes(query))
		);
	};

	useEffect(() => {
		dispatch(getClients());
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
		],
		[]
	);

	const data = useMemo(
		() =>
			clients.map(client => ({
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
						<ul key={client._id}>
							<li>
								{dayOfWeek}: {startTime} - {endTime}
							</li>
						</ul>
					);
				}),
			})),
		[clients]
	);

	if (isLoading) return <Spinner />;

	return (
		<div className='clients'>
			{clients.length > 0 ? (
				<>
					<input
						type='text'
						placeholder='Search'
						onChange={e => setQuery(e.target.value)}
						className='client__filter'
					/>
					<ClientsTable columns={columns} data={search(data)} />
				</>
			) : (
				<p className='clients__message'>You have no clients to display</p>
			)}
		</div>
	);
};

export default Clients;
