import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, deleteItems, removeItem } from "../../Redux/cartSlice";

function CardCart({ name, images, id, price, discription, qty }) {
  let dispatch = useDispatch();
  let imageArray = images?.map((img) => img)[0];

  return (
    <>
      <div className="flex md:flex-row flex-col items-center gap-5 md:gap-[60px] w-auto  md:w-[900px] ">
        <Link
          to={`/productDetails/${id}`}
          className="flex md:flex-row flex-col px-5 md:items-start items-center gap-1 md:gap-4 ">
          <img
            className="md:w-[200px] md:h-[200px] w-[100px] h-[100px] "
            src={`http://localhost:3001/${imageArray?.replace("public", "")}`}
            alt="image"
          />
          <div className="flex flex-col items-start gap-2 w-auto md:w-80">
            <p>{name}</p>
            <p>${qty * price}</p>
            <p className="flex-wrap">{discription?.substring(0, 100)}...</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(addToCart({ id: id }))}
            className="w-7 h-7 duration-200  border border-blue-700 hover:bg-blue-500 hover:text-white font-medium flex items-center justify-center rounded-full">
            +
          </button>
          <p>{qty}</p>
          <button
            onClick={() => dispatch(deleteItems(id))}
            className="w-7 h-7 duration-200  border border-blue-700 hover:bg-blue-500 hover:text-white font-medium flex items-center justify-center rounded-full">
            -
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(removeItem(id))}
            className="flex items-center justify-center bg-red-600 text-white rounded-md px-3">
            Remove
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CardCart;
