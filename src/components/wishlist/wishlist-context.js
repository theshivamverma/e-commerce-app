import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react"
import env from "react-dotenv"
import { wishlistReducer } from "../wishlist"

const WishlistContext = createContext();

export function WishlistProvider({ children }){

    const [state, dispatch] = useReducer(wishlistReducer, { wishlistId: window.localStorage.getItem("ths_user_wishlist"), wishlist: [] })

    async function getWishlistData(){
        try{
            const { status, data } = await axios.get(`${env.BASE_URL}/wishlist/${state.wishlistId}`)
            if(status === 200){
                console.log(data)
                dispatch({ type: "LOAD_DATA", payload: data.wishlist.products })
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getWishlistData();
    },[])

    async function addToWishlist(prodId){
        try{
            const { status, data } = await axios.post(`${env.BASE_URL}/wishlist/${state.wishlistId}`, {
                prodId
            })
            if(status === 200){
                getWishlistData()
            }
        }catch(error){
            console.log(error)
        }
    }

    async function removeFromWishlist(prodId) {
      try {
        const { status, data } = await axios.post(`${env.BASE_URL}/wishlist/${state.wishlistId}/remove`,{
            prodId,
        });
        if (status === 200) {
          getWishlistData();
        }
      } catch (error) {
        console.log(error);
      }
    }

    return(
        <WishlistContext.Provider value={{ wishlist: state.wishlist, wishlistDispatch: dispatch, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist(){
    return useContext(WishlistContext);
}