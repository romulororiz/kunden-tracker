import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = '/api/users';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: builder => ({
		userLogin: builder.mutation({
			query: body => {
				return {
					url: '/login',
					method: 'POST',
					body,
				};
			},
		}),
		userRegister: builder.mutation({
			query: body => {
				return {
					url: '/',
					method: 'POST',
					body,
				};
			},
		}),
	}),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
