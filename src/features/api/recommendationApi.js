import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/recommendation`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getRecommendation: builder.mutation({
      query: (formData) => ({
        url: "/recommend",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      }),
    }),
  }),
});

export const { useGetRecommendationMutation } = recommendationApi; 