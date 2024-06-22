import {  useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";


function Navbar() {
  let cartSelector = useSelector((state) => state.cart.cart);
  let numderCart = cartSelector.reduce((acc, cur) => acc + cur.qty, 0);
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
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  let handleSearch = () => {
    navigate(`/search/${search}`);
  };

  return (
    <div className="flex relative mx-auto items-center justify-between px-10 h-14 ">
      <div>
        <Link to="/">
          <MdOutlineShoppingBag className="font-bold text-2xl text-blue-500" />
        </Link>
      </div>
      <div
        className={`flex  flex-col gap-3 absolute top-0 z-50 right-0 md:flex-row  md:items-center md:static  bg-black text-white md:space-x-5 md:bg-white opacity-100 bg-opacity-90 md:text-black w-full md:w-auto text-center h-fit md:h-auto ${
          show ? " translate-y-0" : "-translate-y-96"
        } md:translate-y-0 transition-all duration-700 ease-in-out font-medium text-sm`}>
        <div className="flex  flex-col items-center gap-6  md:flex-row">
          <div className="flex items-center justify-between bg-white md:bg-none md:w-[400px] mt  w-full  border-b border-blue-300  ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search"
              className=" outline-none px-3 py-1 text-black    w-full "
            />
            <CiSearch
              onClick={() => handleSearch()}
              className="text-3xl text-blue-400 cursor-pointer "
            />
          </div>
          <Link
            onClick={() => setShow(false)}
            className="hover:text-blue-600 p-3  transition-all duration-300 z-50 "
            to="/cart">
            <div className="relative">
              <PiShoppingCartSimpleThin className="size-7" />
              <p className="absolute bg-blue-600 shadow-lg text-white opacity-100 bg-opacity-75 filter text-xs px-2 -top-1 left-4 rounded-full ">
                {numderCart}
              </p>
            </div>
          </Link>
        </div>
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
            to={
              selector?.user?.role === "true"
                ? "/admin"
                : `/profile/${selector?.user?.id}`
            }>
            <div className="flex flex-col items-center">
              <p className="text-red-700">{selector?.user?.name}</p>
              <p className="text-red-700 underline">{selector?.user?.email}</p>
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
