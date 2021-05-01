import { useState, createContext, useContext, useEffect } from "react";
import env from "react-dotenv";
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
  },[]);

  async function setUserData(){
    try{
      const { status, data : {user} } = await axios.get(`${env.BASE_URL}/user/${localStorage.getItem("ths_user_id")}`)
      if(status === 200){
        setUser({...user})
      }
    }catch(error){
      console.log(error)
    }
  }

  function setUserLogin(userId) {
    setLogin(true);
    localStorage.setItem("ths_login", true);
    localStorage.setItem("ths_user_id", userId);
    setUserData()
    return userId
  }

  function userLogout() {
    setLogin(false);
    localStorage.removeItem("ths_login");
    localStorage.removeItem("ths_user_id");
  }

  async function loginUser(username, password) {
    try {
      const { status, data } = await axios.post(`${env.BASE_URL}/auth`, {
        username,
        password,
      });
      if (status === 200) {
        return setUserLogin(data.user[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function registerUser(name, email, username, password) {
    try {
      let cart, wishlist;
      const { status: cartStatus, data: cartData } = await axios.get(
        `${env.BASE_URL}/cart/add/new`,
        {}
      );
      if (cartStatus === 200) {
        cart = cartData.savedData._id;
      }
      const { status: wishlistStatus, data: wishlistData } = await axios.get(
        `${env.BASE_URL}/wishlist/add/new`,
        {}
      );
      if (wishlistStatus === 200) {
        wishlist = wishlistData.savedData._id;
      }
      const { status: userStatus, data: userData } = await axios.post(
        `${env.BASE_URL}/user`,
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
        setUserLogin(userData.savedUser._id,);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ login, user, loginUser, registerUser, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
