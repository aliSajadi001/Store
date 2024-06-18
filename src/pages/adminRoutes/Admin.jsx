import { Link } from "react-router-dom";
import WithAuth from "../../helper/adminAuth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import CardProductsAdmin from "./CardProductsAdmin";

function Admin() {
  let [productsList, setProductsList] = useState([]);
  let [loading, setLoading] = useState(false);
  console.log(productsList);

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

  let admin = useSelector((state) => state?.user?.user);

  return (
    <div className="w-full h-auto flex flex-col items-center pt-5 gap-5 px-7">
      <div className="flex items-center justify-center gap-4 flex-wrap text-white font-normal ">
        <Link
          className="flex w-50 items-center text-xl justify-center rounded-sm border p-2 bg-blue-400"
          to="/admin/createProduct">
          CreateProduct
          <span>
            <GoPlus className="text-3xl ml-2" />
          </span>
        </Link>
      </div>
      <div className="felx items-center text-3xl text-black p-4 ">
        <p>
          Hello
          <span className="text-orange-600 font-bold"> {admin.name} </span>, you
          are the admin the website
        </p>
      </div>
      <div className="flex items-center justify-between gap-44">
        <p className="text-3xl italic border-b-2 border-black">All Products</p>
        <p className="text-3xl ">
          <span>Number:</span> {productsList.length}
        </p>
      </div>
      <div className="flex items-center">
        {loading ? (
          <>
            <p className="text-3xl font-bold animate-pulse">Loading...</p>
          </>
        ) : (
          <div>
            {productsList &&
              productsList?.map((product) => (
                <div key={product._id}>
                  <CardProductsAdmin
                    name={product.name}
                    price={product.price}
                    images={product?.imagePath}
                    discription={product.discription}
                    quantity={product.quantity}
                    _id={product._id}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WithAuth(Admin);
