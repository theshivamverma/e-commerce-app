export default function productReducer(state, action){
    switch (action.type) {
      case "LOAD_DATA":
        return { ...state, products: action.payload };
      case "ADD_TO_WISHLIST":
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                isWishlist: !action.payload.isWishlist,
              };
            } else return product;
          }),
        };
      case "ITEM_ADDED_TO_CART":
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, isAddedToCart: true };
            }
            return product;
          }),
        };
      case "ITEM_REMOVED_FROM_CART":
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, isAddedToCart: false };
            }
            return product;
          }),
        };
      default:
        return;
    }
}