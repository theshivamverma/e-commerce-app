import { ProductList, useProduct } from "./components/product";
import { CartList } from "./components/cart";
import { Navbar } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/home/Home";
import { useFilter, getSortedData, getFilteredData } from "./components/filters"
import { useActionControl } from "./components/action-control"
import ToastSuccess from "./components/utilities/Toast/ToastSucess"
import ProductDetail from "./components/product/ProductDetail";
import { Login, Register } from "./components/login"
import { PrivateRoute } from "./components/auth"

function App() {

  const { products } = useProduct();

  const { filterState: { includeOutofStock, showFastDeliveryOnly, sort, categories, priceRange } } = useFilter()

  const { actionState: { menuState, showSuccessToast }, actionDispatch } = useActionControl()

  console.log(showSuccessToast)

  const sortedData = getSortedData(products, sort);
  const filteredData = getFilteredData(sortedData, {
    includeOutofStock,
    showFastDeliveryOnly,
    categories,
    priceRange,
  });

  console.log({filteredData})

  const pathname = useLocation().pathname;

  return (
    <div
      className={
        pathname === "/products"
          ? "App products"
          : pathname === "/"
          ? "App home"
          : "App"
      }
    >
      <Navbar />
      <button
        className="btn btn-col btn-secondary btn-float btn-menu"
        onClick={() => actionDispatch({ type: "TOGGLE_MENU", payload: true })}
      >
        <i className="fas fa-filter menu icon-med"></i>
      </button>
      {showSuccessToast && <ToastSuccess /> }
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
        <Route path="/products/:productId" element={<ProductDetail />} />
        <PrivateRoute path="/cart" element={<CartList />} />
        <Route path="/wishlist" element={<WishlistList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
