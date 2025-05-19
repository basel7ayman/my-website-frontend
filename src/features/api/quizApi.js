import { apiSlice } from './apiSlice';

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data,
            }),
        }),
        getQuizByLecture: builder.query({
            query: (lectureId) => `/quizzes/lecture/${lectureId}`,
        }),
        getQuizzesByCourse: builder.query({
            query: (courseId) => `/quizzes/course/${courseId}`,
        }),
        submitQuiz: builder.mutation({
            query: ({ quizId, data }) => ({
                url: `/quizzes/${quizId}/submit`,
                method: 'POST',
                body: data,
            }),
        }),
        getStudentQuizResults: builder.query({
            query: ({ quizId, studentId }) => `/quizzes/${quizId}/results/${studentId}`,
        }),
    }),
});

export const {
    useCreateQuizMutation,
    useGetQuizByLectureQuery,
    useGetQuizzesByCourseQuery,
    useSubmitQuizMutation,
    useGetStudentQuizResultsQuery,
} = quizApiSlice; 