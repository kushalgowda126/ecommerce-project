export const initialState = {
  cart: [],
  wishlist: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
  const exists = state.wishlist.find(
    (item) => item.id === action.payload.id
  );

  if (exists) {
    return state;
  }

  return {
    ...state,
    wishlist: [
      ...state.wishlist,
      action.payload,
    ],
  };

case "REMOVE_FROM_WISHLIST":
  return {
    ...state,
    wishlist: state.wishlist.filter(
      (item) => item.id !== action.payload
    ),
  };
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.id !== action.payload
        ),
      };
      case "CLEAR_CART":
  return {
    ...state,
    cart: [],
  };

    default:
      return state;
  }
};