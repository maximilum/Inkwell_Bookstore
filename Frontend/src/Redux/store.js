import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { booksApi } from "./booksApiSlice";

const store = configureStore({
  reducer: { cart: cartReducer, [booksApi.reducerPath]: booksApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
