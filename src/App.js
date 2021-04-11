import { ProductList, useProduct } from "./components/product";
import { CartList } from "./components/cart";
import { Navbar } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/home/Home";
import { useFilter, getSortedData, getFilteredData } from "./components/filters"

function App() {

  const { products } = useProduct();

  const { filterState: { includeOutofStock, showFastDeliveryOnly, sort, categories, priceRange } } = useFilter()

  const sortedData = getSortedData(products, sort);
  const filteredData = getFilteredData(sortedData, {
    includeOutofStock,
    showFastDeliveryOnly,
    categories,
    priceRange,
  });

  const pathname = useLocation().pathname;

  return (
    <div
      className={
        pathname === "/products"
          ? "App products"
          : pathname === "/" ? "App home" : "App"
      }
    >
      <Navbar />
      <button
        className="btn btn-col btn-secondary btn-float btn-menu"
        // onClick={() => dispatch({ type: "TOGGLE_MENUSTATE", payload: true })}
      >
        <i className="fas fa-filter menu icon-med"></i>
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <>
              <Sidebar />
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
