import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../utils/getBaseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/orders`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.ser("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQuery,
  tagTypes: ["orders"],
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        headers: {
          "content-type": "application/json",
        },
      }),

      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
