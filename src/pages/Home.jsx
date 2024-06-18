import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CardProduct from "../component/CardProduct";
function Home({ msg }) {
  let [productsList, setProductsList] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    toast.warn(msg);
  }, [msg]);

  let getProduct = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("http://localhost:3001/getProducts");
      console.log(data);
      setProductsList((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <p className="text-3xl">Loading...</p>
        </>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-20 place-items-center">
          {productsList &&
            productsList.map((product) => (
              <div key={product._id}>
                <CardProduct
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  discription={product.discription}
                  images={product.imagePath}
                  id={product._id}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
