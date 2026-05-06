import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

function CartProvider({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userKey = currentUser ? `cart_${currentUser.email}` : "cart_guest";

  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    () => JSON.parse(localStorage.getItem(userKey)) || [],
  );

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(cart));
  }, [cart, userKey]);

  return (
    <CartContext.Provider value={{ cart, dispatch, userKey }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
