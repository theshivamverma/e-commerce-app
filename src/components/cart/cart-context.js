import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react"
import { cartReducer } from "../cart"

const CartContext = createContext();

export function CartProvider( { children } ){

    const [state, dispatch] = useReducer(cartReducer, { cart:[] })

    useEffect(() => {
        (
            async function(){
                try{
                   const { data, status } = await axios("/api/cart");
                   if(status === 200){
                       dispatch({ type: "LOAD_DATA", payload: data.carts })
                   }
                }catch(error){
                    console.log(error)
                }
            }
        )()
    },[])

    return (
        <CartContext.Provider value={ { cartItems: state.cart, cartDispatch : dispatch } }>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}