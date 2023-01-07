import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClients } from '../features/clients/clientSlice';
import { useMemo } from 'react';
import ClientsTable from './Layout/ClientsTable';
import '@styles/scss/ClientsTable.scss';

const Clients = () => {
	const { clients } = useSelector(state => state.client);

	const dispatch = useDispatch();

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
				workingHours: client.workingHours
					.map(workingHour => {
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
						return `${dayOfWeek}: ${startTime} - ${endTime}`;
					})
					.join(', '),
			})),
		[clients]
	);

	return (
		<>{!clients.length ? '' : <ClientsTable columns={columns} data={data} />}</>
	);
};
export default Clients;
