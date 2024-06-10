import { Link } from "react-router-dom";
function CardProduct({ name, price, images, quantity, discription }) {
  let array = images?.map((emah) => emah);
  let aray = Array.from(array)[1];
  console.log(aray);

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
      <div>
        <p
          className={`${
            qty > 0
              ? "text-white bg-blue-600 p-1 rounded-sm text-sm w-fit"
              : "text-white bg-red-600 p-1 rounded-sm text-sm"
          }`}>
          {qty > 0 ? "Avilable" : " Finishe"}
        </p>
      </div>
      <div>
        <p className="text-sm ">{discription.substring(0, 60)} ...</p>
      </div>
      <div>
        <button className="bg-blue-600 text-white p-1 font-medium hover:bg-blue-900 rounded-sm w-full text-center">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
