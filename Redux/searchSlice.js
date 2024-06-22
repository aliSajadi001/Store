import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  product: null,
  loading: false,
};
let searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.product = action.payload;
    },

    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export let { addSearch, loading } = searchSlice.actions;
export default searchSlice.reducer;
