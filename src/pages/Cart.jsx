import { useDispatch, useSelector } from "react-redux";
import WithAuth from "../helper/withAuth";
import { GiShoppingCart } from "react-icons/gi";
import CardCart from "../component/CardCart";
import { Link } from "react-router-dom";
import { deleteAllCart } from "../../Redux/cartSlice";

function Cart() {
  let dispatch = useDispatch();
  let cartSlice = useSelector((state) => state.cart.cart);
  console.log(cartSlice.map((i) => i?.id));
  return (
    <div className="flex flex-col gap-10 mt-8 md:p-16 p-3">
      {cartSlice.length === 0 ? (
        <div className="flex flex-col items-center justify-center animate-pulse relative">
          <div>
            <GiShoppingCart className=" md:size-[500px] size-[200px] opacity-15" />
          </div>
          <div className="flex md:flex-row flex-col items-center justify-center gap-2 font-medium  md:text-3xl flex-wrap text-xl  text-blue-800 absolute">
            <p className="">Your shopping cart is empty</p>
            <Link to="/" className="underline ">
              Go to store
            </Link>
          </div>
        </div>
      ) : (
        <>
          {cartSlice.map((product, index) => (
            <div key={index}>
              <CardCart
                name={product?.name}
                images={product?.array}
                id={product?.id}
                price={product?.price}
                qty={product?.qty}
                discription={product?.discription}
              />
            </div>
          ))}
          <div className="flex md:flex-row flex-col items-center justify-center rounded-[7px] shadow-md  shadow-teal-700 gap-10 border md:h-[90px] md:w-[800px] ">
            <div>
              <div className="flex items-center gap-2 font-medium">
                <p>Total basket :</p>
                <p> {cartSlice.reduce((acc, cur) => acc + cur.qty, 0)} </p>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p>Total price basket :</p>
                <p className="text-xl">
                  {cartSlice.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-28">
              <button className="bg-blue-600 px-6 rounded-[5px] text-white py-1 font-medium">
                Payment
              </button>
              <button
                className="bg-red-600 px-6 rounded-[5px] text-white py-1 font-medium"
                onClick={() => dispatch(deleteAllCart())}>
                Delete all cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WithAuth(Cart);
