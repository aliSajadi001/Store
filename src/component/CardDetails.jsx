import axios from "axios";
import { useEffect, useState } from "react";
import CardSimilarProduct from "./CardSimilarProduct";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function CardDetails({ name, category, images, quantity, discription, price }) {
  let [index, setIndex] = useState(0);
  let array = images?.map((image) => image);
  let aray = Array?.from(array)[index];
  let [similarProduct, setSimilarProduct] = useState([]);

  let similarProducts = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/getSimilarProduct/${category}`
      );
      if (data.product) {
        setSimilarProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    similarProducts();
  }, [category]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 5024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="flex flex-col gap-[100px] ">
      <div className="p-10 duration-200 flex md:flex-row flex-col md:items-start md:gap-10 ">
        <div className="flex  md:flex-row flex-col-reverse items-center gap-3">
          <div className="flex md:flex-col flex-row gap-2">
            {images?.map((image, i) => (
              <div key={i}>
                <img
                  onClick={() => setIndex(i)}
                  className={`md:w-[100px] md:h-[100px] flex-wrap w-[50px] h-[50px] cursor-pointer duration-150 ${
                    i === index ? "border rounded-md p-1 border-blue-600" : ""
                  } `}
                  src={`http://localhost:3001/${image.replace("public", "")}`}
                  alt="image"
                />
              </div>
            ))}
          </div>
          <div>
            <img
              className="md:w-[400px] md:h-[400px] w-[200px] h-[200px]"
              src={`http://localhost:3001/${aray.replace("public", "")}`}
              alt="image"
            />
          </div>
        </div>
        <div className="md:w-[600px] w-auto flex-wrap flex flex-col gap-2 ">
          <p className="text-3xl ">{name}</p> <hr />
          <div className="flex items-center justify-between ">
            <p className="text-xl font-medium">
              <span>$</span> {price}
            </p>
            <p
              className={`${
                parseInt(quantity) > 1
                  ? "px-2 rounded-md text-white bg-blue-700"
                  : "px-2 rounded-md text-white bg-red-700"
              }`}>{`${parseInt(quantity) > 1 ? "Avilable" : "Finish"}`}</p>
          </div>
          <p>{discription}</p>
          <button className="px-5 border border-blue-800 rounded-[5px] font-medium hover:bg-blue-500 hover:text-white">
            Add to cart
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-3xl italic text-center ">Similar Product</p>
          <hr />
        </div>
        <div>
          <Carousel responsive={responsive}>
            {similarProduct.map((product) => (
              <div key={product._id}>
                <CardSimilarProduct
                  name={product.name}
                  price={product.price}
                  images={product.imagePath}
                  id={product._id}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
