/* eslint-disable */

import { ProductList, useProduct } from "./components/product";
import { CartList } from "./components/cart";
import { Navbar } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import {
  useFilter,
  getSortedData,
  getFilteredData,
} from "./components/filters";
import ProductDetail from "./components/product/ProductDetail";
import { Login, Register } from "./components/login";
import { PrivateRoute } from "./components/auth";
import { Toast } from "./components/utilities/Toast";
import { useState, useEffect } from "react";
import { setupAuthExceptionHandler } from "./components/auth"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const { products } = useProduct();

  const {
    filterState: {
      includeOutofStock,
      showFastDeliveryOnly,
      sort,
      categories,
      priceRange,
    },
  } = useFilter();

  const sortedData = getSortedData(products, sort);
  const filteredData = getFilteredData(sortedData, {
    includeOutofStock,
    showFastDeliveryOnly,
    categories,
    priceRange,
  });

  const pathname = useLocation().pathname;
  const navigate = useNavigate()

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showProfilecard, setShowProfilecard] = useState(false)

  useEffect(() => {
    setupAuthExceptionHandler(navigate);
  }, []);

  return (
    <div
      style={{ backgroundColor: "black !important" }}
      className={`App ${pathname === "/products" && 'products'} ${pathname === "/" && 'home'}`}
    >
      <Navbar 
        setShowFilterMenu={setShowFilterMenu} 
        showProfilecard={showProfilecard} 
        setShowProfilecard={setShowProfilecard} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <>
              <Sidebar
                showFilterMenu={showFilterMenu}
                setShowFilterMenu={setShowFilterMenu}
              />
              <ProductList products={filteredData} />
            </>
          }
        />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <PrivateRoute path="/cart" element={<CartList />} />
        <PrivateRoute path="/wishlist" element={<WishlistList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
