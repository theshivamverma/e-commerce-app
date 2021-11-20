/* eslint-disable */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, singupUser } from "../auth";
import { useWishlist } from "../wishlist";
import { useCart } from "../cart";
import { useToast } from "../utilities/Toast";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../utilities/validation/validator-functions";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { login, setLogin, setToken } = useAuth();
  const { setWishlistData } = useWishlist();
  const { setCartData } = useCart();
  const { callToast } = useToast();

  const navigate = useNavigate();

  login && navigate("/");

  async function checkForUsername() {
    setErrorUsername(await validateUsername(username));
  }

  async function checkForEmail() {
    setErrorEmail(await validateEmail(email));
  }

  function checkForName() {
    setErrorName(validateName(name));
  }

  function checkForPassword() {
    setErrorPassword(validatePassword(password));
  }

  async function signupHandler() {
    checkForPassword();
    checkForName();
    checkForEmail();
    checkForUsername();
    if (
      errorUsername === "" &&
      errorEmail === "" &&
      errorName === "" &&
      errorPassword === "" &&
      username &&
      email &&
      password &&
      name
    ) {
      const { token, success } = await singupUser(
        name,
        email,
        username,
        password
      );
      if (success) {
        setLogin(true)
        setToken(token)
        setWishlistData();
        setCartData();
        callToast("SUCCESS_TOAST", "Signup successfull" );
      } else {
        callToast("ERROR_TOAST", "Error signing up" );
      }
    } else {
      callToast(
        "ERROR_TOAST",
        "Invalid credentials for signup",
      );
    }
  }

  return (
    <div className="login-container centered box-shadow-down p-2-1 border-round">
      <h1 className="font-size-l medium center">Store user registration</h1>
      <label
        className={errorName ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setName(e.target.value)}
          onBlur={() => checkForName()}
        />
        <span className="input-label">Name</span>
        {errorName !== "" && <span class="error-text">{errorName}</span>}
      </label>
      <label
        className={errorEmail ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => checkForEmail()}
        />
        <span className="input-label">Email</span>
        {errorEmail !== "" && <span class="error-text">{errorEmail}</span>}
      </label>
      <label
        className={errorUsername ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkForUsername()}
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
        onClick={() => signupHandler()}
      >
        Register
      </button>
      <p className="mt-1 center">
        Existing user then{" "}
        <Link to="/login">
          <span className="underline">Login</span>
        </Link>
      </p>
    </div>
  );
}
