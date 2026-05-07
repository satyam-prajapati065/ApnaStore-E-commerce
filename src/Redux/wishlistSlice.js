import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [], 
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    TOGGLE: (state, action) => {
      const product = action.payload;
      const exist = state.wishlistItems.find((item) => item.id === product.id);

      if (exist) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== product.id,
        );
      } else {
        state.wishlistItems.push(product);
      }
    },
  },
});

export const { TOGGLE } = wishlistSlice.actions;

export default wishlistSlice.reducer;
