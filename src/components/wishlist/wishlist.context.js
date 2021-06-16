import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../wishlist";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const { isLoggedIn } = JSON.parse(
    localStorage?.getItem("ths_login")
  ) || { isLoggedIn: false };

  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlistId: "",
    wishlist: [],
  });

  async function getWishlistData() {
    try {
      if (state.wishlistId !== "") {
        const { status, data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${state.wishlistId}`
        );
        if (status === 200) {
          dispatch({
            type: "LOAD_DATA",
            payload: { wishlistData: data.wishlist.products },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setWishlistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.wishlistId !== "") {
      getWishlistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wishlistId]);

  async function setWishlistData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        dispatch({ type: "SET_WISHLIST_ID", payload: { wishlistId: user.wishlist } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${state.wishlistId}`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getWishlistData();
        return { success: true }
      }
    } catch (error) {
      console.log(error);
      getWishlistData();
      return { success: false }
    }
  }

  async function removeFromWishlist(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/wishlist/${state.wishlistId}/remove`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getWishlistData();
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      getWishlistData();
      return { success: false };
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        wishlistDispatch: dispatch,
        addToWishlist,
        removeFromWishlist,
        setWishlistData,
        getWishlistData,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
