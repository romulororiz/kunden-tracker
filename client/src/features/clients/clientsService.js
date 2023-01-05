import axios from 'axios';

const API_URL = '/api/clients';

// Add new client
export const addClient = async (clientData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, clientData, config);

	return data;
};

// Get all clients
export const getClients = async token => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, config);

	return data;
};
