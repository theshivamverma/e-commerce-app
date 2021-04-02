import { ProductList, useProduct } from "./components/product";
import { CartList } from "./components/cart";
import { Navbar, useNav } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { useReducer } from "react";

function sortReducer(state, action) {
  switch (action.type) {
    case "INCLUDE_OUT_OF_STOCK":
      return { ...state, includeOutofStock: !state.includeOutofStock };
    case "SHOW_FAST_DELIVERY_ONLY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
    case "SORT":
      return { ...state, sort: action.payload };
    case "ADD_BRAND_TO_FILTER":
      return { ...state, brands: [...state.brands, action.payload] };
    case "REMOVE_BRAND_FROM_FILTER":
      return {...state, brands : [...state.brands.filter(brand => brand !== action.payload)]}
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload }
    default:
      return;
  }
}

function App() {
  const [
    { includeOutofStock, showFastDeliveryOnly, sort, brands, priceRange },
    dispatch,
  ] = useReducer(sortReducer, {
    includeOutofStock: false,
    showFastDeliveryOnly: false,
    sort: null,
    brands: [],
    priceRange: 499
  });

  const { route } = useNav();

  const { products } = useProduct();

  function getSortedData(productList, sort) {
    if (sort !== null && sort === "LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    if (sort !== null && sort === "HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { includeOutofStock, showFastDeliveryOnly, brands, priceRange }
  ) {
    return productList
      .filter(({ inStock }) => (includeOutofStock ? true : inStock))
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ brand }) =>
        brands.length > 0 ? (brands.includes(brand) ? brand : false) : brand
      )
      .filter(({ price }) => price <= priceRange ? price : false)
  }

  const sortedData = getSortedData(products, sort);
  const filteredData = getFilteredData(sortedData, {
    includeOutofStock,
    showFastDeliveryOnly,
    brands,
    priceRange
  });

  return (
    <div className={route === "products" ? "App products" : "App"}>
      <Navbar />
      {route === "products" && (
        <Sidebar
          state={{ includeOutofStock, showFastDeliveryOnly, sort, brands }}
          dispatch={dispatch}
        />
      )}
      {route === "products" && <ProductList products={filteredData} />}
      {route === "cart" && <CartList />}
      {route === "wishlist" && <WishlistList />}
    </div>
  );
}

export default App;
