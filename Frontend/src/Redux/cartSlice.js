import { createSlice } from "@reduxjs/toolkit";
import auth from "../authentication/firebase.config";

const getUserId = () => auth.currentUser?.uid ?? null;

const loadCartItems = () => {
  const userId = getUserId();
  if (!userId) return [];

  const stored = localStorage.getItem(userId);
  if (!stored) return [];

  try {
    return JSON.parse(stored) || [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

const initialState = {
  cartItems: loadCartItems(),
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
        const userId = getUserId();
        if (!userId) {
          alert("You need to be logged in to add items to the cart.");
          return;
        }
        state.cartItems.push(action.payload);
        localStorage.setItem(userId, JSON.stringify(state.cartItems));
      } else alert("Item already exist!");
    },
    restoreCart: (state) => {
      state.cartItems = loadCartItems();
    },
    clearCart: (state) => {
      state.cartItems = [];
      const userId = getUserId();
      if (!userId) return;
      localStorage.removeItem(userId);
    },
    deleteItem: (state, action) => {
      // Accept either an item object or an id as payload
      const id = action.payload && (action.payload._id ?? action.payload);
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      const userId = getUserId();
      if (!userId) return;
      localStorage.setItem(userId, JSON.stringify(state.cartItems));
    },
  },
});

export const { addItemToCart, clearCart, deleteItem, restoreCart } =
  cartSlice.actions;
export default cartSlice.reducer;
