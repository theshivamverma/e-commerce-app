import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth"
import { useWishlist } from "../wishlist"
import { useCart } from "../cart"
import { useToast } from "../utilities/Toast"

export default function Login() {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, loginUser } = useAuth();
  const { setWishlistData } = useWishlist()
  const { setCartData } = useCart();
  const { toastDispatch } = useToast();

  const { state } = useLocation();

  const navigate = useNavigate();

  login && navigate(state?.from ? state.from : "/")

  return (
    <div className="login-container centered box-shadow-down p-2-1 border-round">
      <h1 className="font-size-l medium center">Store user login</h1>
      <label className="inputgroup">
        <input className="input-textbox focus-blue" placeholder=" "  onChange={(e) => setUsername(e.target.value)} />
        <span className="input-label">Username</span>
      </label>
      <label className="inputgroup">
        <input type="password" className="input-textbox focus-blue" placeholder=" " onChange={(e) => setPassword(e.target.value)} />
        <span className="input-label">Password</span>
      </label>
      <button className="btn btn-col btn-primary border-round btn-block" 
      onClick={async () => {
          const {id, success} = await loginUser(userName, password);
          if(success){
            setWishlistData(id);
            setCartData(id);
            toastDispatch({ type: "SUCCESS_TOAST", payload: "Login successful" })
          }else{
            toastDispatch({ type: "ERROR_TOAST", payload: "Wrong credentials" })
          }
      }}>
        Login
      </button>
      <p className="mt-1 center">
        Are you a New user then{" "}
        <Link to="/register">
          <span className="underline">Register</span>
        </Link>
      </p>
    </div>
  );
}
