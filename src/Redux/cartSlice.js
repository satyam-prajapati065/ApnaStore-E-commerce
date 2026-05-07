import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const exist = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    REMOVE_FROM_CART: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    INCREMENT_QUANTITY: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    DECREMENT_QUANTITY: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload,
          );
        } else {
          item.quantity -= 1;
        }
      }
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} = cartSlice.actions;

export default cartSlice.reducer;
