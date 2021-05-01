import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react"
import env from "react-dotenv"
import { wishlistReducer } from "../wishlist"
import { useAuth } from "../auth"

const WishlistContext = createContext();

export function WishlistProvider({ children }){

    const [state, dispatch] = useReducer(wishlistReducer, { wishlistId : "", wishlist: [] })

    async function getWishlistData(){
        try{
            if(state.wishlistId !== ""){
                console.log(`${env.BASE_URL}/wishlist/${state.wishlistId}`);
                const { status, data } = await axios.get(
                  `${env.BASE_URL}/wishlist/${state.wishlistId}`
                );
                if (status === 200) {
                  console.log(data);
                  dispatch({
                    type: "LOAD_DATA",
                    payload: data.wishlist.products,
                  });
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(localStorage.getItem("ths_login")){
            console.log(localStorage.getItem("ths_user_id"))
            setWishlistData(localStorage.getItem("ths_user_id"));
        }
    }, [])

    // useEffect(() => {
    //     if(localStorage.getItem("ths_login")){
    //         getWishlistData();
    //     }
    // }, [])

    useEffect(() => {
      if (localStorage.getItem("ths_login")) {
        getWishlistData();
      }
    }, [state.wishlistId]);

    async function setWishlistData(id){
        console.log("called")
        try{
            console.log(`${env.BASE_URL}/user/${id}`);
            const { status, data : {user} } = await axios.get(`${env.BASE_URL}/user/${id}`)
            console.log({ status, user });
            if(status == 200){
                
                console.log("success id fetch")
                dispatch({ type: "SET_WISHLIST_ID", payload: user.wishlist });
            }
        }catch(error){
            console.log(error)
        }
    }

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
        <WishlistContext.Provider value={{ wishlist: state.wishlist, 
        wishlistDispatch: dispatch, addToWishlist, removeFromWishlist, setWishlistData, getWishlistData }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist(){
    return useContext(WishlistContext);
}