import React from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
function CardProductsAdmin({
  name,
  price,
  quantity,
  images,
  discription,
  _id,
}) {
  let image = images?.map((image) => image);
  let imageArray = Array.from(image)[0];

  let deleteProduct = async (id) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:3001/deleteProduct/${id}`
      );
      if (data.success) {
        toast.success(`${name} deleted successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-7 gap-4">
      <div>
        <img
          alt="image"
          className="w-[90px] h-[90px] rounded-full"
          src={`http://localhost:3001/${imageArray?.replace("public", "")}`}
        />
      </div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{quantity}</div>
      <div>{discription?.substring(0, 10)}...</div>
      <div className="flex flex-col gap-1">
        <Link to={`/admin/updateProduct/${_id}`}>
          <CiEdit className="text-2xl text-blue-700 " />
        </Link>
        <button>
          <AiOutlineDelete
            className="text-2xl text-red-700 "
            onClick={() => deleteProduct(_id)}
          />
        </button>
      </div>
    </div>
  );
}

export default CardProductsAdmin;
