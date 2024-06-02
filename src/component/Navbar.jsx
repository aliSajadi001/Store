import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Navbar() {
  let selector = useSelector((state) => state.user);
  let handleClick = () => {
    localStorage.removeItem("token");
    setShow(false);
    toast.info("User logout");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  let [show, setShow] = useState(false);
  return (
    <div className="flex relative mx-auto items-center justify-between px-10 h-14 ">
      <div>
        <p>
          <MdOutlineShoppingBag className="font-bold text-2xl text-blue-500" />
        </p>
      </div>
      <div
        className={`flex  flex-col gap-3 absolute top-0 right-0 md:flex-row  md:items-center md:static  bg-black text-white md:space-x-5 md:bg-white opacity-100 bg-opacity-90 md:text-black w-full md:w-auto text-center h-fit md:h-auto ${
          show ? " translate-y-0" : "-translate-y-96"
        } md:translate-y-0 transition-all duration-700 ease-in-out font-medium text-sm`}>
        <Link
          onClick={() => setShow(false)}
          className="hover:text-blue-600 p-3  transition-all duration-300 z-50 "
          to="/cart">
          Cart
        </Link>

        {selector?.user ? (
          <button
            onClick={() => handleClick()}
            className="hover:text-blue-600 p-3 transition-all duration-300 z-50 ">
            Logout
          </button>
        ) : (
          <>
            <Link
              onClick={() => setShow(false)}
              className="hover:text-blue-600 p-3 transition-all duration-300 z-50 "
              to="/login">
              Login
            </Link>

            <Link
              onClick={() => setShow(false)}
              className="hover:text-blue-600 p-3 transition-all duration-300 z-50 "
              to="/signup">
              Signup
            </Link>
          </>
        )}

        {selector.user ? (
          <Link
            onClick={() => setShow(false)}
            className="hover:text-blue-600 p-3 transition-all duration-300 z-50 "
            to="/profile">
            <div className="flex flex-col items-center">
              <p className="text-red-700">{selector?.user?.name}</p>
              <p className="text-red-700 ">{selector?.user?.email}</p>
            </div>
          </Link>
        ) : (
          ""
        )}

        <button
          onClick={() => setShow(false)}
          className=" p-3 text-2xl  transition-all duration-300 z-50 ">
          <RiCloseLargeFill className="md:hidden text-red-600 hover:-rotate-180 duration-500 " />
        </button>
      </div>
      <TiThMenu
        onClick={() => setShow(!show)}
        className="text-2xl md:hidden cursor-pointer text-blue-500"
      />
    </div>
  );
}

export default Navbar;
