export default function productReducer(state, { type, payload }) {
  switch (type) {
    case "LOAD_DATA":
      return { ...state, products: payload };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              isWishlist: !payload.isWishlist,
            };
          } else return product;
        }),
      };
    case "MOVE_TO_WISHLIST":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              isWishlist: true,
            };
          } else return product;
        }),
      };
    case "ITEM_ADDED_TO_CART":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id) {
            return { ...product, isAddedToCart: true };
          }
          return product;
        }),
      };
    case "ITEM_REMOVED_FROM_CART":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id) {
            return { ...product, isAddedToCart: false };
          }
          return product;
        }),
      };
    default:
      return;
  }
}
