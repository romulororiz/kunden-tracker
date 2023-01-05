import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
	user: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register new user
export const registerUser = createAsyncThunk(
	'auth/register',
	async (userData, thunkAPI) => {
		try {
			return await authService.registerUser(userData);
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
