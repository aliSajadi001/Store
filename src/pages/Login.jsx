import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = async (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  //SEND DATA IN BACEND //
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let email = data.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!email) {
        toast.error("The email is not validate");
      } else {
        if (data.password.length < 6) {
          toast.error("The password must be more than 6 char");
        } else {
          setLoading(true);

          let res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          let respons = await res.json();
          if (respons.success) {
            localStorage.setItem("token", JSON.stringify(respons.token));
            data.email = "";
            data.password = "";
            toast.success(respons.msg);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            toast.error(respons.msg);
          }
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-[100px] ">
      <div className="flex flex-col w-full md:w-[400px] mx-4 ">
        <p className="text-black text-3xl font-normal text-center">Login</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <div className="w-full border rounded-md py-1 px-2">
              <input
                required
                onChange={handleChange}
                value={data.email}
                type="email"
                id="email"
                className="outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="w-full border rounded-md py-1 px-2 flex items-center ">
              <input
                required
                onChange={handleChange}
                value={data.password}
                type={show ? "text" : "password"}
                id="password"
                className="outline-none w-full"
              />
              <p
                className="bg-slate-100 rounded-lg px-2 py-1 text-xs cursor-pointer "
                onClick={() => setShow(!show)}>
                {show ? "hidden" : "show"}
              </p>
            </div>
          </div>
          <button
            disabled={loading ? true : false}
            className="w-full disabled:bg-slate-500 disabled:cursor-not-allowed py-1 border border-spacing-1 border-black rounded-lg mt-4 hover:bg-black hover:text-white font-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
