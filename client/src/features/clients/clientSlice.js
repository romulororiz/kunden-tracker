import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientsService from './clientService';

const initialState = {
	clients: [],
	client: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create new Client
export const addClient = createAsyncThunk(
	'client/add',
	async (clientData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientsService.addClient(clientData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get all clients
export const getClients = createAsyncThunk(
	'client/getAllClients',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientsService.addClient(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get client by ID
export const getSingleClient = createAsyncThunk(
	'client/getSingleClient',
	async (clientId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientsService.addClient(clientId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete a client
export const deleteClient = createAsyncThunk(
	'client/deleteClient',
	async (clientId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientsService.addClient(clientId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {},
});

// export const { reset } = productSlice.actions;
// export default productSlice.reducer;
