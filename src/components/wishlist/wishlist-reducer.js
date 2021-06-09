export default function wishlistReducer(state, { type, payload }) {
  switch (type) {
    case "SET_WISHLIST_ID":
      return {
        ...state,
        wishlistId: payload,
      };
    case "LOAD_DATA":
      return { ...state, wishlist: payload };
    case "ADD_NEWITEM_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.concat({
          product: payload,
          visible: true,
        }),
      };
    case "ADD_EXISTING_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.map((wishlistItem) => {
          if (wishlistItem._id === payload) {
            return { ...wishlistItem, visible: true };
          } else return wishlistItem;
        }),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.map((wishlistItem) => {
          if (wishlistItem._id === payload) {
            return { ...wishlistItem, visible: false };
          }
          return wishlistItem;
        }),
      };
    default:
      return;
  }
}
