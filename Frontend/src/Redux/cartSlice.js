import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const bookExist = state.cartItems.find(
        (book) => book._id === action.payload._id,
      );
      if (!bookExist) {
        state.cartItems.push(action.payload);
      } else alert("Item already exist!");
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    deleteItem: (state, action) => {
      // Accept either an item object or an id as payload
      const id = action.payload && (action.payload._id ?? action.payload);
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
    },
  },
});

export const { addItemToCart, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
