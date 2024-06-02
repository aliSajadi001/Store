import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { currentUser } from "../Redux/userSlice";
import { useEffect } from "react";
import Cart from "./pages/Cart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
