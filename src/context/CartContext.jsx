import {createContext,useReducer,useEffect,} from "react";
import {
  cartReducer,
  initialState,
} from "../reducer/CartReducer";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
  cartReducer,
  initialState,
  () => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
  const parsed = JSON.parse(savedCart);

  return {
    cart: parsed.cart || [],
    wishlist: parsed.wishlist || [],
  };
}

return initialState;
  }
);
useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(state)
  );
}, [state]);

  return (
    <CartContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;