import { ProductList, useProduct } from "./components/product";
import { CartList } from "./components/cart";
import { Navbar } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { useReducer } from "react";
import { Routes, Route, useLocation } from "react-router-dom"

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
    case "TOGGLE_MENUSTATE":
      return {...state, menuState: action.payload}
    default:
      return;
  }
}

function App() {
  const [
    { includeOutofStock, showFastDeliveryOnly, sort, brands, priceRange, menuState },
    dispatch,
  ] = useReducer(sortReducer, {
    includeOutofStock: false,
    showFastDeliveryOnly: false,
    sort: null,
    brands: [],
    priceRange: 499,
    menuState: false,
  });

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
    priceRange,
  });

  return (
    <div
      className={
        useLocation().pathname === "/products" ? "App products" : "App"
      }
    >
      <Navbar />
      <button
        className="btn btn-col btn-secondary btn-float btn-menu"
        onClick={() => dispatch({ type: "TOGGLE_MENUSTATE", payload: true })}
      >
        <i className="fas fa-filter menu icon-med"></i>
      </button>
      <Routes>
        <Route
          path="/products"
          element={
            <>
              <Sidebar
                state={{
                  includeOutofStock,
                  showFastDeliveryOnly,
                  sort,
                  brands,
                  menuState,
                  priceRange
                }}
                dispatch={dispatch}
              />
              <ProductList products={filteredData} />
            </>
          }
        />
        <Route path="/cart" element={<CartList />} />
        <Route path="/wishlist" element={<WishlistList />} />
      </Routes>
    </div>
  );
}

export default App;
