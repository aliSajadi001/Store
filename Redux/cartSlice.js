import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let existItem = state.cart.find((item) => {
        return item.id === action.payload.id;
      });

      if (existItem) {
        state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: (item.qty += 1) }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    deleteItems: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      if (product && product.qty > 1) {
        state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: (item.qty -= 1) } : item
        );
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else if (product && product.qty === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeItem: (state, action) => {
      let itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export let { addToCart, deleteItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
