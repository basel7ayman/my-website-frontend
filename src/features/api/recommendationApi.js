import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RECOMMENDATION_API = "http://localhost:8080/api/v1/recommendation";

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RECOMMENDATION_API,
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