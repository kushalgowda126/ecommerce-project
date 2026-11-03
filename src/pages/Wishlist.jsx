import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  const { state, dispatch } =
    useContext(CartContext);

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {state.wishlist.length === 0 ? (
        <h2>No Products In Wishlist</h2>
      ) : (
        <div className="products-grid">
          {state.wishlist.map((item) => (
            <div
              key={item.id}
              className="product-card"
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <h3>{item.title}</h3>

              <p>
                ₹
                {Math.round(
                  item.price * 83
                ).toLocaleString("en-IN")}
              </p>

              <button
                className="remove-btn"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: item.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;