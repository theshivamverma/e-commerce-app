import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cartId: "",
    cart: [],
  });

  useEffect(() => {
    if (localStorage.getItem("ths_login")) {
      setCartData(localStorage.getItem("ths_user_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("ths_login")) {
      getCartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cartId]);

  async function getCartData() {
    try {
      if (state.cartId !== "") {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/cart/${state.cartId}`,
          {}
        );
        if (status === 200) {
          dispatch({ type: "LOAD_DATA", payload: data.cart.products });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setCartData(id) {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${id}`
      );
      if (status === 200) {
        dispatch({ type: "SET_CART_ID", payload: user.cart });
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
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
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
