import { createContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlistReducer";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userKey = currentUser
    ? `wishlist_${currentUser.email}`
    : "wishlist_guest";

  const [wishlist, dispatch] = useReducer(
    wishlistReducer,
    [],
    () => JSON.parse(localStorage.getItem(userKey)) || [],
  );

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(wishlist));
  }, [wishlist, userKey]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch, userKey }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
