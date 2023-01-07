import axios from 'axios';

const API_URL = '/api/users';

export const registerUser = async userData => {
	const { data } = await axios.post(API_URL, userData);

	if (data) {
		localStorage.setItem('user', JSON.stringify(data));
	}

	return data;
};

export const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	registerUser,
	logout,
};

export default authService;
