import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import clientReducer from '@features/clients/clientSlice';
import { authApi } from '@features/auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		client: clientReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
