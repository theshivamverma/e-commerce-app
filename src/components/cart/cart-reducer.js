
export default function cartReducer(state, action) {
  console.log({ action, state });
  switch (action.type) {
    case "SET_CART_ID":
    return {...state, cartId: action.payload}
    case "LOAD_DATA":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat({
          product: action.payload,
          quantity: 1,
          visible: true
        }),
      };
    case "ADD_EXISTING_TO_CART":
      return {
        ...state,
        cart: state.cart.map(cartItem => {
          if(cartItem._id === action.payload){
            return {...cartItem, visible: !cartItem.visible, quantity: 1}
          }
          return cartItem
        })
      }
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else return cartItem;
        }),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else return cartItem;
        }),
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, visible: false };
          } else return cartItem;
        }),
      };
    default:
      return;
  }
}