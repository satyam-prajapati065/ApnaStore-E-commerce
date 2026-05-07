import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// Current user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Dynamic keys
const cartKey = currentUser ? `cart_${currentUser.email}` : "cart_guest";

const wishlistKey = currentUser
  ? `wishlist_${currentUser.email}`
  : "wishlist_guest";

// LocalStorage data load
const loadState = () => {
  try {
    return {
      cart: {
        cartItems: JSON.parse(localStorage.getItem(cartKey)) || [],
      },

      wishlist: {
        wishlistItems: JSON.parse(localStorage.getItem(wishlistKey)) || [],
      },
    };
  } catch{
    return undefined;
  }
};

// Store create
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  preloadedState: loadState(),
});

// LocalStorage me save
store.subscribe(() => {
  try {
    const state = store.getState();

    localStorage.setItem(cartKey, JSON.stringify(state.cart.cartItems));

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(state.wishlist.wishlistItems),
    );
  } catch (error) {
    console.log(error);
  }
});
