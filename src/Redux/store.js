import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// current user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// load state
const loadState = () => {
  try {
    return {
      cart: {
        cartItems: currentUser?.cart || [],
      },

      wishlist: {
        wishlistItems: currentUser?.wishlist || [],
      },
    };
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

// store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  preloadedState: loadState(),
});

// save state
store.subscribe(() => {
  try {
    const state = store.getState();

    let users = JSON.parse(localStorage.getItem("userData")) || [];

    let current = JSON.parse(localStorage.getItem("currentUser"));

    if (!current) return;

    const updatedUser = {
      ...current,
      cart: state.cart.cartItems,
      wishlist: state.wishlist.wishlistItems,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    const userIndex = users.findIndex((u) => u.id === current.id);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;

      localStorage.setItem("userData", JSON.stringify(users));
    }
  } catch (error) {
    console.log(error);
  }
});
