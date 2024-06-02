import { useSelector } from "react-redux";
import Login from "../pages/Login";

let WithAuth = (Component) => {
  let selector = (props) => {
    let user = useSelector((state) => state.user.user);
    if (!user) {
      return <Login />;
    } else {
      return <Component {...props} />;
    }
  };
  return selector;
};
export default WithAuth;
