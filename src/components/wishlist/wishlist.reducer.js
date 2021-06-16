export default function wishlistReducer(state, { type, payload }) {
  switch (type) {
    case "SET_WISHLIST_ID":
      return {
        ...state,
        wishlistId: payload.wishlistId,
      };
    case "LOAD_DATA":
      return { ...state, wishlist: payload.wishlistData };
    case "ADD_NEWITEM_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.concat({
          product: payload.product,
          visible: true,
        }),
      };
    case "ADD_EXISTING_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.map((wishlistItem) => {
          if (wishlistItem._id === payload.wishlistItemId) {
            return { ...wishlistItem, visible: true };
          } else return wishlistItem;
        }),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.map((wishlistItem) => {
          if (wishlistItem._id === payload.wishlistItemId) {
            return { ...wishlistItem, visible: false };
          }
          return wishlistItem;
        }),
      };
    default:
      return;
  }
}
