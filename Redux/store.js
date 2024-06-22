import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";

export let Store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    search: searchSlice,
  },
});
