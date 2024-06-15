import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
function CardProduct({ name, price, images, quantity }) {
  let array = images?.map((image) => image);
  let aray = Array.from(array)[0];

  let qty = parseInt(quantity);
  return (
    <div className="flex flex-col w-[200px] z-40 gap-3">
      <Link to="/">
        <img
          className="w-full h-[200px] hover:scale-95 duration-300 z-0"
          src={`http://localhost:3001/${aray.replace("public", "")}`}
          alt=""
        />
      </Link>

      <div className="flex items-center justify-between">
        <p className="font-medium">{name}</p>
        <p className="font-medium">${price}</p>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`${
            qty > 0
              ? "text-white bg-blue-600 px-2 rounded-sm text-xs w-fit "
              : "text-white bg-red-600 px-2 rounded-sm text-xs w-fit "
          }`}>
          {qty > 0 ? "Avilable" : " Finishe"}
        </p>
        <FaCartPlus className="text-2xl hover:text-blue-600 duration-300" />
      </div>
    </div>
  );
}

export default CardProduct;
