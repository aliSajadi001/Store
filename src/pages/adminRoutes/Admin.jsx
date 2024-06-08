import { Link } from "react-router-dom";
import WithAuth from "../../helper/adminAuth";
import { useSelector } from "react-redux";

function Admin() {
  let admin = useSelector((state) => state?.user?.user);
  console.log(admin);
  return (
    <div className="w-full h-auto   flex flex-col items-center pt-5 gap-5">
      <div className="flex items-center justify-center gap-4 flex-wrap text-white font-normal ">
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/product">
          Product
        </Link>
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/createProduct">
          CreateProduct
        </Link>
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/updateProduct">
          UpdateProduct
        </Link>
      </div>
      <div className="felx items-center text-3xl text-black p-4 ">
        <p>
          Hello
          <span className="text-orange-600 font-bold"> {admin.name} </span>, you
          are the admin the website
        </p>
      </div>
    </div>
  );
}

export default WithAuth(Admin);
