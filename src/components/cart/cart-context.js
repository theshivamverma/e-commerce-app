import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react"
import { cartReducer } from "../cart"
import env from "react-dotenv"
import ToastSuccess from "../utilities/Toast/Toast"

const CartContext = createContext();

export function CartProvider( { children } ){

    const [state, dispatch] = useReducer(cartReducer, {
      cartId: window.localStorage.getItem("ths_user_cart"),
      cart: [],
    });

    async function getCartData() {
      try {
        const { data, status } = await axios.get(
          `${env.BASE_URL}/cart/${state.cartId}`,
          {}
        );
        console.log(data, status);
        if (status === 200) {
          dispatch({ type: "LOAD_DATA", payload: data.cart.products });
          
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        getCartData()
    },[state.cart])

    async function increaseQuantity(prodId) {
      try {
        const { status } = await axios.post(
          `${env.BASE_URL}/cart/${state.cartId}/update/inc`,
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
          `${env.BASE_URL}/cart/${state.cartId}/update/dec`,
          {
            prodId,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    async function removeCartItem(prodId) {
      try {
        const { status } = await axios.post(
          `${env.BASE_URL}/cart/${state.cartId}/update/remove`,
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

    async function addToCart(prodId){
        try{
            const { status, data } = await axios.post(`${env.BASE_URL}/cart/${state.cartId}`, {
                prodId
            })
            if(status === 200){
                getCartData()
            }
        }catch(error){
            console.log(error)
        }
    }


    return (
        <CartContext.Provider 
            value={
            { 
                cartItems: state.cart, 
                cartDispatch : dispatch, 
                getCartData, 
                increaseQuantity, 
                decreaseQuantity,
                removeCartItem,
                addToCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}