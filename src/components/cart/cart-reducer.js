
export default function cartReducer(state, action) {
  console.log({ action });
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat({
          ...action.payload,
          quantity: 1,
        }),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cart) => {
          if (cart.id === action.payload.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          } else return cart;
        }),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cart) => {
          if (cart.id === action.payload.id) {
            return { ...cart, quantity: cart.quantity - 1 };
          } else return cart;
        }),
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.id !== action.payload.id),
      };
    case "MOVE_TO_WISHLIST":
      return {
        ...state,
      };
    default:
      return;
  }
}