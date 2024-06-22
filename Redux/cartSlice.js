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
    ///////////////////////add to cart//////////////////////
    addToCart: (state, action) => {
      let existItem = state.cart.find((item) => {
        return item.id === action.payload.id;
      });
      if (existItem) {
        console.log(action.payload.qty);
        console.log(existItem.qty);
        if (existItem.qty >= action.payload.qty) {
          alert(`The ${action.payload.name} is finishd`);
        } else {
          state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: (item.qty += 1) }
              : item
          );
        }
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    /////////////////////////delete Item//////////////////////////
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
    ///////////////////////////remove one item in cart////////////////
    removeItem: (state, action) => {
      let itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    ////////////////////////////remove all cart///////////////////////////
    deleteAllCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export let { addToCart, deleteItems, removeItem, deleteAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
