import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://my-website-backend-5134.onrender.com/api/v1',
        credentials: 'include',
    }),
    tagTypes: ['Course', 'Lecture', 'Quiz', 'Progress'],
    endpoints: (builder) => ({}),
}); 