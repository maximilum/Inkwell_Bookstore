import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../utils/getBaseURL";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/books`,
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetAllBooksQuery } = booksApi;
