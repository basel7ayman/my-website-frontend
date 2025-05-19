import { apiSlice } from './apiSlice';

export const gamificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateRankings: builder.mutation({
            query: () => ({
                url: '/gamification/update',
                method: 'POST',
            }),
        }),
        getRankings: builder.query({
            query: () => '/gamification',
        }),
        getStudentRanking: builder.query({
            query: (studentId) => `/gamification/student/${studentId}`,
        }),
    }),
});

export const {
    useUpdateRankingsMutation,
    useGetRankingsQuery,
    useGetStudentRankingQuery,
} = gamificationApiSlice; 