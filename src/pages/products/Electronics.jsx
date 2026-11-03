import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

const Electronics = () => {
  const { data, loading } = useFetch(
    "/products/category/electronics"
  );

  if (loading) return <Spinner />;

  return (
    <div className="product-grid">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default Electronics;