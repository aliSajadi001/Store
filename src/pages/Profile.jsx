import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [show, setShow] = useState(false);
  let [password, setPassword] = useState("");
  let id = useParams().id;

  let getUserInfo = async () => {
    try {
      let { data } = await axios.get(`http://localhost:3001/getInfoUser/${id}`);
      setName(data?.user?.name);
      setEmail(data?.user?.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [id]);

  let updateUser = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.put(`http://localhost:3001/updateUser/${id}`, {
        name,
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-5  py-4  justify-center flex-col md:w-[500px] mx-auto w-full mt-[100px] md:border-t md:border-l md:border-r border-e-neutral-600 border-blue-900 ">
      <p className="text-2xl font-medium text-stone-800">Profile</p>
      <form
        onSubmit={updateUser}
        className="flex flex-col w-auto items-center gap-4">
        <input
          className=" px-3 py-1  font-medium  md:w-[400px] w-ull  outline-none border-b border-blue-800"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" px-3 py-1  font-medium  md:w-[400px] w-ull  outline-none border-b border-blue-800"
          type="email"
          value={email}
          disabled={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex items-center relative">
          <input
            className=" px-3 py-1  font-medium  md:w-[400px] w-ull  outline-none border-b border-blue-800"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShow(!show)}
            className="text-xs absolute right-0 mb-2 bottom-0 px-1 cursor-pointer bg-slate-400 rounded-md font-medium">
            {show ? "hiden" : "show"}
          </span>
        </div>

        <button className=" text-white border-blue-800 font-medium py-1 bg-blue-600 rounded-[6px] w-full hover:bg-opacity-50 ">
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;
