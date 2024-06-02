import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export let Store = configureStore({
  reducer: {
    user: userSlice,
  },
});
