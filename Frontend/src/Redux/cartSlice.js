import { createSlice } from "@reduxjs/toolkit";
import auth from "../auth/firebase.config";
import Swal from "sweetalert2";

export const getUserId = () => {
  const user = auth.currentUser;
  if (!user) return "guest";
  else return user.uid;
};

const getCartFromLocalStorage = (uid) => {
  const items = JSON.parse(localStorage.getItem(uid));
  if (!items) return [];
  else return items;
};

const saveCartToLocalStorage = (cart) => {
  const cartItems = JSON.stringify(cart);
  const uid = getUserId();
  localStorage.setItem(uid, cartItems);
};
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
        saveCartToLocalStorage(state.cartItems);
        Swal.fire({
          title: "Book Added to cart!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Book already exist!",
          icon: "warning",
        });
      }
    },
    initiateCart: (state, action) => {
      const uid = action.payload;
      const savedCartItems = getCartFromLocalStorage(uid);
      state.cartItems = savedCartItems;
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    },
    deleteItem: (state, action) => {
      // Accept either an item object or an id as payload
      const id = action.payload && (action.payload._id ?? action.payload);
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      saveCartToLocalStorage(state.cartItems);
    },
  },
});
export const { addItemToCart, clearCart, deleteItem, initiateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
