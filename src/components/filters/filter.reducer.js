export default function filterReducer(state, { type, payload }) {
  switch (type) {
    case "INCLUDE_OUT_OF_STOCK":
      return { ...state, includeOutofStock: !state.includeOutofStock };
    case "SHOW_FAST_DELIVERY_ONLY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
    case "SORT":
      return {
        ...state,
        sort: payload.sortType,
      };
    case "ADD_CATEGORY_TO_FILTER":
      return {
        ...state,
        categories: [...state.categories, payload.categoryName],
      };
    case "REMOVE_CATEGORY_FROM_FILTER":
      return {
        ...state,
        categories: state.categories.filter((category) => category !== payload.categoryName),
      };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: payload.priceLimit };
    case "CLEAR_SORT_FILTER":
      return { ...state, sort: null };
    default:
      return;
  }
}
