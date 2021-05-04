import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { useWishlist } from "../wishlist";
import { useCart } from "../cart";
import { useToast } from "../utilities/Toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, registerUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const { setWishlistData } = useWishlist();
  const { setCartData } = useCart();
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  login && navigate("/");

  useEffect(() => {
    (async function () {
      try {
        const { status, data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/user`
        );
        if (status === 200) {
          setUsers(data.userData);
        }
      } catch (error) {
        console.lof(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkForUsername() {
    if (username !== "") {
      let res = /^[a-zA-Z0-9]+$/.test(username);
      if(res){
         if (users.map((user) => user.username).includes(username)) {
           setErrorUsername("Username already taken");
         } else {
           setErrorUsername("");
         }
      }else{
        setErrorUsername("only letters and numbers allowed");
      }
    } else {
      setErrorUsername("username is required");
    }
  }

  function validateEmail() {
    const res = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      String(email).toLowerCase()
    );
    return res;
  }

  function checkForEmail() {
    if (email !== "") {
      if (validateEmail()) {
        if (users.map((user) => user.email).includes(email)) {
          setErrorEmail("Email already exists");
        } else {
          setErrorEmail("");
        }
      } else {
        setErrorEmail("Enter a valid email");
      }
    } else {
      setErrorEmail("Email is required");
    }
  }

  function checkForName() {
    if (name !== "") {
      let res = /^[a-zA-Z ]+$/.test(name);
      if (res) {
        setErrorName("");
      } else {
        setErrorName("Numbers not allowed for name");
      }
    } else {
      setErrorName("Name is required");
    }
  }

  function checkForPassword() {
    if (password !== "") {
      if (password.length < 6) {
        setErrorPassword("Password should be atleast 6 digits long");
      } else {
        let res = /[0-9]/.test(password);
        if (res) {
          setErrorPassword("");
        } else {
          setErrorPassword("passowrd must contain a number");
        }
      }
    } else {
      setErrorPassword("Password is required");
    }
  }

  async function registerHandler() {
    checkForPassword();
    checkForName();
    checkForEmail();
    checkForUsername();
    if (
      errorUsername === "" &&
      errorEmail === "" &&
      errorName === "" &&
      errorPassword === "" &&
      username && email && password && name
    ) {
      const { id, success } = await registerUser(
        name,
        email,
        username,
        password
      );
      if (success) {
        setWishlistData(id);
        setCartData(id);
        toastDispatch({ type: "SUCCESS_TOAST", payload: "Signup successfull" });
      } else {
        toastDispatch({ type: "ERROR_TOAST", payload: "Error signing up" });
      }
    } else {
      toastDispatch({
        type: "ERROR_TOAST",
        payload: "Invalid credentials for signup",
      });
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
        onClick={() => registerHandler()}
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
