import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const totalItems = state.cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const subtotal = state.cart.reduce(
  (total, item) =>
    total +
    Math.round(item.price * 83) * item.quantity,
  0
);

const gst = Math.round(subtotal * 0.18);

const grandTotal = subtotal + gst;

  return (
    <div>
      <h1>Shopping Cart</h1>

      {state.cart.length === 0 ? (
        <h3>No Products In Cart</h3>
      ) : (
        state.cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <div>
              <h3>{item.title}</h3>

              <p>${item.price}</p>

              <div className="qty-controls">
                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QTY",
                      payload: item.id,
                    })
                  }
                >
                  -
                </button>

                <span>
                  Qty: {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QTY",
                      payload: item.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {state.cart.length > 0 && (
  <div className="cart-summary">
    <h2>Order Summary</h2>

    <p>
      <strong>Total Items:</strong> {totalItems}
    </p>

    <p>
      <strong>Subtotal:</strong> ₹
      {subtotal.toLocaleString("en-IN")}
    </p>

    <p>
      <strong>GST (18%):</strong> ₹
      {gst.toLocaleString("en-IN")}
    </p>

    <h3>
      Grand Total: ₹
      {grandTotal.toLocaleString("en-IN")}
    </h3>

    <div className="summary-buttons">
      <button
        className="clear-btn"
        onClick={() =>
          dispatch({
            type: "CLEAR_CART",
          })
        }
      >
        Clear Cart
      </button>

      <button
  className="checkout-btn"
  onClick={() => {
    dispatch({
      type: "CLEAR_CART",
    });

    toast.success(
      "Order Placed Successfully,Thank you for shopping with ShopZone 🎉"
    );
  }}
>
  Checkout
</button>
    </div>
  </div>
)}
    </div>
  );
};

export default Cart;