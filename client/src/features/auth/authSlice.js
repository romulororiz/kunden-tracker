import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
};

// Register new user
export const registerUser = createAsyncThunk('auth/register', user => {
	if (user) {
		localStorage.setItem('user', JSON.stringify(user));
	}
	return user;
});

// Login user
export const loginUser = createAsyncThunk('auth/login', user => {
	if (user) {
		localStorage.setItem('user', JSON.stringify(user));
	}
	return user;
});

// Logout user
export const logout = createAsyncThunk('auth/logout', () => {
	return localStorage.removeItem('user');
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
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})

			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})

			.addCase(logout.fulfilled, state => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
