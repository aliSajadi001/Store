import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../component/CardDetails";

function ProductDetails() {
  let [product, setProduct] = useState(null);
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  let getDetails = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `http://localhost:3001/productDetails/${id}`
      );
      setLoading(false);
      setProduct(data.details);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);
  return (
    <div>
      {loading ? (
        <div>
          <p className="text-3xl font-bold text-center animate-pulse">
            Loading...
          </p>
        </div>
      ) : (
        product && (
          <CardDetails
            images={product?.imagePath}
            discription={product?.discription}
            name={product?.name}
            price={product?.price}
            quantity={product?.quantity}
            category={product?.category}
            id={product?._id}
          />
        )
      )}
    </div>
  );
}

export default ProductDetails;
