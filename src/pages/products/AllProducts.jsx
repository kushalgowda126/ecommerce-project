import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";

const AllProducts = () => {
  const { data, loading } =
    useFetch("/products");

  const [searchParams, setSearchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const filteredProducts = data.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <>
      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) =>
          setSearchParams({
            search: e.target.value,
          })
        }
        className="search-input"
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default AllProducts;