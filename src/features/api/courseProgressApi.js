import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/progress`,
    credentials: "include",
  }),
  tagTypes: ["CourseProgress"],
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: (result, error, courseId) => [
        { type: "CourseProgress", id: courseId }
      ],
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST"
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "CourseProgress", id: courseId }
      ],
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST"
      }),
      invalidatesTags: (result, error, courseId) => [
        { type: "CourseProgress", id: courseId }
      ],
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST"
      }),
      invalidatesTags: (result, error, courseId) => [
        { type: "CourseProgress", id: courseId }
      ],
    }),
  }),
});
export const {
useGetCourseProgressQuery,
useUpdateLectureProgressMutation,
useCompleteCourseMutation,
useInCompleteCourseMutation
} = courseProgressApi;
