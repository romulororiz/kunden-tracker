import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';

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
	'client/addClient',
	async (clientData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientService.addClient(clientData, token);
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
			return await clientService.getClients(token);
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
			return await clientService.getSingleClient(clientId, token);
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

// Update a client
export const updateClient = createAsyncThunk(
	'client/updateClient',
	async (clientId, clientData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await clientService.updateClient(clientId, clientData, token);
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
			return await clientService.deleteClient(clientId, token);
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
		reset: state => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addClient.pending, state => {
				state.isLoading = true;
			})
			.addCase(addClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(addClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getClients.pending, state => {
				state.isLoading = true;
			})
			.addCase(getClients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clients = action.payload;
			})
			.addCase(getClients.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSingleClient.pending, state => {
				state.isLoading = true;
			})
			.addCase(getSingleClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.client = action.payload;
			})
			.addCase(getSingleClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteClient.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clients = state.clients.filter(
					client => client._id !== action.payload
				);
			})
			.addCase(deleteClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
