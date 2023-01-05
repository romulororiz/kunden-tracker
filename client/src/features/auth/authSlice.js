import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
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

// Login user
export const loginUser = createAsyncThunk(
	'auth/login',
	async (userData, thunkAPI) => {
		try {
			return await authService.loginUser(userData);
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

// Logout user
export const logout = createAsyncThunk('auth/logout', () => {
	return authService.logout();
});

// Manage actions
export const authSlice = createSlice({
	name: 'auth',
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
			.addCase(registerUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(logout.fulfilled, state => {
				state.user = null;
			});
	},
});
