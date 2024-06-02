import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: {},
};

let userSlice = createSlice({
  name: "usre",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export let { currentUser } = userSlice.actions;
export default userSlice.reducer;
