import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, loading } = useFetch(
    `/products/${id}`
  );

  if (loading) return <Spinner />;

  return (
    <div className="details">
      <img
        src={data.image}
        alt={data.title}
      />

      <div>
        <h2>{data.title}</h2>

        <h3>${data.price}</h3>

        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;