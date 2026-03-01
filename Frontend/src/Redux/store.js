import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { booksApi } from "./booksApiSlice";
import { ordersApi } from "./ordersApiSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(ordersApi.middleware),
});

export default store;
