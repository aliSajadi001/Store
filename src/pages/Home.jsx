import { useEffect } from "react";
import { toast } from "react-toastify";

function Home({ msg }) {
  useEffect(() => {
    toast.warn(msg);
  }, [msg]);

  return (
    <div>
      <p>Hello worled</p>
    </div>
  );
}

export default Home;
