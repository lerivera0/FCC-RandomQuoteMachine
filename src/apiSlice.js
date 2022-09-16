import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiQuotes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://programming-quotes-api.herokuapp.com",
  }),
  endpoints: (builder) => ({
    getRandomQuote: builder.query({
      query: () => "/Quotes/random",
    }),
  }),
});

export const { useGetRandomQuoteQuery } = apiSlice;
