import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("ths_login")) {
      setLogin(JSON.parse(localStorage.getItem("ths_login")));
      setUserData();
    }
  }, []);

  async function setUserData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${localStorage.getItem(
          "ths_user_id"
        )}`
      );
      if (status === 200) {
        setUser({ ...user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function setUserLogin(userId) {
    setLogin(true);
    localStorage.setItem("ths_login", true);
    localStorage.setItem("ths_user_id", userId);
    setUserData();
    return {id: userId, success: true};
  }

  function userLogout() {
    setLogin(false);
    localStorage.removeItem("ths_login");
    localStorage.removeItem("ths_user_id");
  }

  async function loginUser(username, password) {
    try {
      const { status, data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/auth`,
        {
          username,
          password,
        }
      );
      if (status === 200) {
        return setUserLogin(data.user[0]._id);
      }
    } catch (err) {
      return {id: "", success: false};
    }
  }

  async function registerUser(name, email, username, password) {
    try {
      let cart, wishlist;
      const { status: cartStatus, data: cartData } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/add/new`,
        {}
      );
      if (cartStatus === 200) {
        cart = cartData.savedData._id;
      }
      const { status: wishlistStatus, data: wishlistData } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/add/new`,
        {}
      );
      if (wishlistStatus === 200) {
        wishlist = wishlistData.savedData._id;
      }
      const { status: userStatus, data: userData } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user`,
        {
          name,
          username,
          email,
          password,
          cart,
          wishlist,
        }
      );
      if (userStatus === 200) {
        return setUserLogin(userData.savedUser._id)
      }
    } catch (error) {
      return {id: "", success: false}
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, user, loginUser, registerUser, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
