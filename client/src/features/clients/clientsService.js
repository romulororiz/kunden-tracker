import axios from 'axios';

const API_URL = '/api/clients';

// Add new client
export const addClient = async (clientData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, clientData, token);

	return data;
};
