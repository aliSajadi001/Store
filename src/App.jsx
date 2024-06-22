import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { currentUser } from "../Redux/userSlice";
let Login = lazy(() => import("./pages/Login"));
let Cart = lazy(() => import("./pages/Cart"));
let Signup = lazy(() => import("./pages/Signup"));
let Profile = lazy(() => import("./pages/Profile"));
let CreateProduct = lazy(() => import("./pages/adminRoutes/CreateProduct"));
let Admin = lazy(() => import("./pages/adminRoutes/Admin"));
let UpdataProducts = lazy(() => import("./pages/adminRoutes/UpdataProducts"));
let ProductDetails = lazy(() => import("./pages/ProductDetails"));
let Search = lazy(() => import("./pages/Search"));
function App() {
  let dispatch = useDispatch();
  let token = JSON.parse(localStorage.getItem("token"));
  let verifyToken = async () => {
    try {
      let { data } = await axios.get("http://localhost:3001/getuser", {
        headers: { Authorization: token },
      });

      dispatch(currentUser(data.user));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <Suspense fallback="Loading...">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/createProduct" element={<CreateProduct />} />
          <Route path="/admin/updateProduct/:id" element={<UpdataProducts />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
