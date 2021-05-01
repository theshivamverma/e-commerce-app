export default function filterReducer(state, action) {
  switch (action.type) {
    case "INCLUDE_OUT_OF_STOCK":
      return { ...state, includeOutofStock: !state.includeOutofStock };
    case "SHOW_FAST_DELIVERY_ONLY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
    case "SORT":
      return { 
        ...state, 
        sort: action.payload,
      };
    case "ADD_CATEGORY_TO_FILTER":
      return { ...state, categories: [...state.categories, action.payload] };
    case "REMOVE_CATEGORY_FROM_FILTER":
      return {
        ...state,
        categories: state.categories.filter((category) => category !== action.payload),
      };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "CLEAR_SORT_FILTER": 
      return { ...state, sort: null}
    default:
      return;
  }
}
