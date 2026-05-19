import { configureStore } from "@reduxjs/toolkit";
import shelfReducer from "./shelfSlice";
import { booksApi } from "./booksApiSlice";
import { ordersApi } from "./ordersApiSlice";

const store = configureStore({
  reducer: {
    shelf: shelfReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(ordersApi.middleware),
});

export default store;
