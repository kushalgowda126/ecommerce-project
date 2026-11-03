import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

    toast.success("Added To Cart Successfully");
  };

  const addToWishlist = () => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: product,
    });

    toast.success("Added To Wishlist ❤️");
  };

  const isWishlisted =
    state?.wishlist?.some(
      (item) => item.id === product.id
    ) || false;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
        />

        <button
          className={`wishlist-icon ${
            isWishlisted ? "active-heart" : ""
          }`}
          onClick={addToWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 className="product-title">
        {product.title}
      </h3>

      <p className="product-price">
        ₹{" "}
        {Math.round(
          product.price * 83
        ).toLocaleString("en-IN")}
      </p>

      <div className="card-btns">
        <Link
          className="details-btn"
          to={`/product/${product.id}`}
        >
          Details
        </Link>

        <button
          className="add-btn"
          onClick={addToCart}
        >
          Add Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;