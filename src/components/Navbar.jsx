import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";


const Navbar = () => {
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  useEffect(() => {
  searchRef.current.focus();
}, []);
const navigate = useNavigate();

const handleSearch = () => {
  if (search.trim()) {
    navigate(`/products?search=${search}`);
  }
};
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { state } = useContext(CartContext);
  const wishlistCount = state?.wishlist?.length || 0;
  const totalItems = (state?.cart || []).reduce(
  (total, item) =>
    total + (item.quantity || 1),
  0
);


  return (
    <nav className={`navbar ${theme}`}>
      <h2>ShopZone</h2>
      <div className="navbar-search">
  <input
    ref={searchRef}
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }}
  />

  <button onClick={handleSearch}>
    🔍
  </button>
</div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({totalItems})</NavLink>
        <NavLink to="/wishlist">Wishlist ({wishlistCount})</NavLink>
        <NavLink to="/manage">Manage</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;