import WithAuth from "../helper/withAuth";

function Cart() {
  console.log("cart");
  return (
    <div>
      <p>cartPage</p>
    </div>
  );
}

export default WithAuth(Cart);
