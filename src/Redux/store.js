import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// load state
const loadState = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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

    const users = JSON.parse(localStorage.getItem("userData")) || [];

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      cart: state.cart.cartItems,
      wishlist: state.wishlist.wishlistItems,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user,
    );

    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  } catch (error) {
    console.log(error);
  }
});
