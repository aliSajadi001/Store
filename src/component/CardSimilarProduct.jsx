import { Link } from "react-router-dom";

function CardSimilarProduct({ name, images, price, id }) {
  let image = images.map((img) => img);
  let array = Array.from(image)[0];

  return (
    <Link
      to={`/productDetails/${id}`}
      className="flex items-center gap-3 flex-col py-8">
      <img
        className="md:w-[200px] md:h-[200px]  w-[100px] h-[100px]"
        src={`http://localhost:3001/${array?.replace("public", "")}`}
        alt="image"
      />
      <div className="flex items-center justify-between ">
        <p className="font-medium">{name}</p>-
        <p className="font-medium">${price}</p>
      </div>
    </Link>
  );
}

export default CardSimilarProduct;
