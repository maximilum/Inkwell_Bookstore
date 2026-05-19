import { createSlice } from "@reduxjs/toolkit";
import auth from "../auth/firebase.config";
import Swal from "sweetalert2";

export const getUserId = () => {
  const user = auth.currentUser;
  if (!user) return "guest";
  else return user.uid;
};

const getShelfFromLocalStorage = (uid) => {
  const items = JSON.parse(localStorage.getItem(uid));
  if (!items) return [];
  else return items;
};

const saveShelfToLocalStorage = (shelf) => {
  const shelfItems = JSON.stringify(shelf);
  const uid = getUserId();
  localStorage.setItem(uid, shelfItems);
};
const initialState = {
  shelfItems: getShelfFromLocalStorage(getUserId()),
};

const shelfSlice = createSlice({
  name: "shelf",
  initialState: initialState,
  reducers: {
    addItemToShelf: (state, action) => {
      const bookExist = state.shelfItems.find(
        (book) => book._id === action.payload._id,
      );
      if (!bookExist) {
        const userId = getUserId();
        if (!userId) {
          alert("You need to be logged in to add items to the shelf.");
          return;
        }
        state.shelfItems.push(action.payload);
        saveShelfToLocalStorage(state.shelfItems);
        Swal.fire({
          title: "Book Added to shelf!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Book already exist!",
          icon: "warning",
        });
      }
    },
    initiateShelf: (state, action) => {
      const uid = action.payload;
      const savedShelfItems = getShelfFromLocalStorage(uid);
      state.shelfItems = savedShelfItems;
    },
    restoreShelf: (state) => {
      state.shelfItems = loadShelfItems();
    },
    clearShelf: (state) => {
      state.shelfItems = [];
      saveShelfToLocalStorage(state.shelfItems);
    },
    deleteItem: (state, action) => {
      // Accept either an item object or an id as payload
      const id = action.payload && (action.payload._id ?? action.payload);
      state.shelfItems = state.shelfItems.filter((item) => item._id !== id);
      saveShelfToLocalStorage(state.shelfItems);
    },
  },
});
export const { addItemToShelf, clearShelf, deleteItem, initiateShelf } =
  shelfSlice.actions;
export default shelfSlice.reducer;
