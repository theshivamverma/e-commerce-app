import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth"
import { useWishlist } from "../wishlist"
import { useCart } from "../cart"
import { useToast } from "../utilities/Toast"
import { loginUser } from "../auth"

export default function Login() {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorUsername, setErrorUsername] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  
  const { login, setLogin, setToken } = useAuth();
  const { setWishlistData } = useWishlist()
  const { setCartData } = useCart();
  const { toastDispatch } = useToast();

  const { state } = useLocation();

  const navigate = useNavigate();

  login && navigate(state?.from ? state.from : "/")

  function checkForUsername(){
    if(userName !== ""){
      setErrorUsername("")
    }else{
      setErrorUsername("username is required")
    }
  }

  function checkForPassword() {
    if (password !== "") {
      setErrorPassword("");
    } else {
      setErrorPassword("password is required");
    }
  }

  async function loginHandler(){
    checkForUsername()
    checkForPassword()
    if(errorPassword === "" && errorUsername === ""){
      const { success, token } = await loginUser(userName, password);
      if (success) {
        setLogin(true)
        setToken(token)
        setWishlistData()
        setCartData()
        toastDispatch({ type: "SUCCESS_TOAST", payload: "Login successful" });
      } else {
        toastDispatch({ type: "ERROR_TOAST", payload: "Wrong credentials" });
      }
    }else{
        toastDispatch({ type: "ERROR_TOAST", payload: "Enter proper credentials" });
    }
  }


  return (
    <div className="login-container centered box-shadow-down p-2-1 border-round">
      <h1 className="font-size-l medium center">Store user login</h1>
      <label
        className={errorUsername ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkForUsername}
        />
        <span className="input-label">Username</span>
        {errorUsername !== "" && (
          <span class="error-text">{errorUsername}</span>
        )}
      </label>
      <label
        className={errorPassword ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          type="password"
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => checkForPassword()}
        />
        <span className="input-label">Password</span>
        {errorPassword !== "" && (
          <span class="error-text">{errorPassword}</span>
        )}
      </label>
      <button
        className="btn btn-col btn-primary border-round btn-block"
        onClick={() => loginHandler()}
      >
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
