import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientsService from './clientsService';

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

// export const { reset } = productSlice.actions;
// export default productSlice.reducer;
