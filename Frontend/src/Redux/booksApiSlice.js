import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../utils/getBaseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetAllBooksQuery } = booksApi;
