import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  const { data: products, loading } = useFetch("/products");

  const [searchParams] = useSearchParams();

const search =
  searchParams.get("search") || "";

const [localSearch, setLocalSearch] =
  useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  if (loading) return <Spinner />;

  const filteredProducts = products
    .filter((product) => {
      const searchValue =
  localSearch || search;

const matchesSearch = product.title
  .toLowerCase()
  .includes(searchValue.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      }

      if (sortOrder === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div>
    <div className="category-links">
  <Link className="category-btn" to="electronics">
    Electronics
  </Link>

  <Link className="category-btn" to="mens">
    Men's Clothing
  </Link>

  <Link className="category-btn" to="jewellery">
    Jewellery
  </Link>
</div>

<Outlet />
      <h1>Products</h1>

      <div className="filter-section">
        <input
  type="text"
  placeholder="Search products..."
  value={localSearch}
  onChange={(e) =>
    setLocalSearch(e.target.value)
  }
/>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="all">
            All Categories
          </option>

          <option value="electronics">
            Electronics
          </option>

          <option value="jewelery">
            Jewelery
          </option>

          <option value="men's clothing">
            Men's Clothing
          </option>

          <option value="women's clothing">
            Women's Clothing
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low To High
          </option>

          <option value="high">
            Price: High To Low
          </option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;