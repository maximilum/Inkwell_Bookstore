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
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/`,
      providesTags: ["books"],
    }),
    getBook: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/",
        method: "POST",
        body: newBook,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, update }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: update,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
