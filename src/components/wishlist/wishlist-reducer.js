export default function wishlistReducer(state, action){
    console.log("wishlist reducer", {action}, {state})
   switch(action.type){
       case "SET_WISHLIST_ID":
           return {
               ...state,
               wishlistId: action.payload
           }
       case "LOAD_DATA": 
            return {...state, wishlist: action.payload}
       case "ADD_NEWITEM_TO_WISHLIST": 
            return {
                ...state, 
                wishlist: state.wishlist.concat({
                    product: action.payload,
                    visible: true
                })
            }
       case "ADD_EXISTING_TO_WISHLIST": 
            return {
                ...state,
                wishlist: state.wishlist.map(wishlistItem => {
                    if(wishlistItem._id === action.payload){
                        return {...wishlistItem, visible: true}
                    }
                    else return wishlistItem
                })
            }
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.map(wishlistItem => {
                    if(wishlistItem._id === action.payload){
                        return {...wishlistItem, visible: false}
                    }
                    return wishlistItem
                })
            }
        default:
            return;
   }
}