import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../component/CardProduct";
import { MdSearchOff } from "react-icons/md";

function Search() {
  let [productsList, setProductsList] = useState([]);
  let [loading, setLoading] = useState(false);

  let search = useParams().search;
  let getSearchResulu = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(`http://localhost:3001/search/${search}`);
      if (data?.success) {
        setProductsList(data?.product);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getSearchResulu();
  }, [search]);
  return (
    <div className="px-11 py-5 ">
      {loading ? (
        <>
          <p className="text-4xl animate-pulse flex items-center justify-center pt-40">
            Loading...
          </p>
        </>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-20 place-items-center">
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <div key={product._id}>
                <CardProduct
                  name={product?.name}
                  price={product?.price}
                  quantity={product?.quantity}
                  discription={product?.discription}
                  images={product?.imagePath}
                  id={product?._id}
                />
              </div>
            ))
          ) : (
            <div className="flex  items-center mx-auto animate-pulse">
              <MdSearchOff className="md:size-[500px] size-[200px] text-blue-100  " />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
