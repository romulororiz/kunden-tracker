import axios from 'axios';

const API_URL = '/api/clients';

export const addClient = async (clientData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, clientData, config);

	return data;
};

export const getClients = async token => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(API_URL, config);

	return data;
};

export const getSingleClient = async (clientId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(`${API_URL}/${clientId}`, config);

	return data;
};

export const deleteClient = async (clientId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.delete(`${API_URL}/${clientId}`, config);

	if (data) {
		return clientId;
	}
};

export const updateClient = async (clientId, clientData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		`${API_URL}/${clientId}`,
		clientData,
		config
	);

	return data;
};

const clientService = {
	addClient,
	getClients,
	getSingleClient,
	deleteClient,
	updateClient,
};

export default clientService;
