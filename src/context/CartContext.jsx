import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
