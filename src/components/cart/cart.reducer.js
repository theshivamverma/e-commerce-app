export default function cartReducer(state, { type, payload }) {
  switch (type) {
    case "SET_CART_ID":
      return { ...state, cartId: payload.cartId };
    case "LOAD_DATA":
      return { ...state, cart: payload.cartData };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat({
          product: payload.product,
          quantity: 1,
          visible: true,
        }),
      };
    case "ADD_EXISTING_TO_CART":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === payload.cartItemId) {
            return { ...cartItem, visible: !cartItem.visible, quantity: 1 };
          }
          return cartItem;
        }),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === payload.cartItemId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else return cartItem;
        }),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === payload.cartItemId) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else return cartItem;
        }),
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === payload.cartItemId) {
            return { ...cartItem, visible: false };
          } else return cartItem;
        }),
      };
    default:
      return;
  }
}
