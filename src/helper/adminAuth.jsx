import { useSelector } from "react-redux";
import Home from "../pages/Home";

let WithAuth = (Component) => {
  let adminPages = (props) => {
    let user = useSelector((state) => state?.user?.user?.role);

    if (user === "true") {
      return <Component {...props} />;
    } else {
      return <Home msg="Private Page" />;
    }
  };
  return adminPages;
};
export default WithAuth;
