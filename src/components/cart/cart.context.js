/* eslint-disable */

import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from ".";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { isLoggedIn } = JSON.parse(
    localStorage?.getItem("ths_login")
  ) || { isLoggedIn: false };

  const [state, dispatch] = useReducer(cartReducer, {
    cartId: "",
    cart: [],
  });

  useEffect(() => {
    if (isLoggedIn) {
      setCartData();
    }
  }, []);

  useEffect(() => {
    if (state.cartId !== "") {
      getCartData();
    }
  }, [state.cartId]);

  async function getCartData() {
    try {
      if (state.cartId !== "") {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}`,
          {}
        );
        if (status === 200) {
          dispatch({ type: "LOAD_DATA", payload:{ cartData: data.cart.products }});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setCartData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        dispatch({ type: "SET_CART_ID", payload: { cartId: user.cart } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function increaseQuantity(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}/update/inc`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getCartData();
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      getCartData();
      return { success: false };
    }
  }

  async function decreaseQuantity(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}/update/dec`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getCartData();
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      getCartData();
      return { success: false };
    }
  }

  async function removeCartItem(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}/update/remove`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getCartData();
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      getCartData();
      return { success: false };
    }
  }

  async function addToCart(prodId) {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}`,
        {
          prodId,
        }
      );
      if (status === 200) {
        getCartData();
        return { success: true }
      }
    } catch (error) {
      console.log(error);
      getCartData();
      return { success: false };
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cart,
        cartDispatch: dispatch,
        getCartData,
        increaseQuantity,
        decreaseQuantity,
        removeCartItem,
        addToCart,
        setCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
