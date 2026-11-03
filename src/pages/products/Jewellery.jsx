import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const Jewellery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Jewellery Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Jewellery;