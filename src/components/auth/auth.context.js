/* eslint-disable */

import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "."

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { isLoggedIn, token: storedToken } = JSON.parse(
    localStorage?.getItem("ths_login")
  ) || { isLoggedIn: false, token: null };

  const [login, setLogin] = useState(isLoggedIn);
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (login && token) {
      setUserData();
    }
  }, [login, token]);

  token && setupAuthHeaderForServiceCalls(token);

  async function setUserData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        setUser({ ...user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, user, token, setUserData, setLogin, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
