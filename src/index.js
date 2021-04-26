import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./components/product";
import { CartProvider } from "./components/cart";
import { FilterProvider } from "./components/filters"
import { ActionControlProvider } from "./components/action-control"
import { AuthProvider } from "./components/auth"
import { WishlistProvider } from "./components/wishlist"
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <FilterProvider>
            <ActionControlProvider>
              <AuthProvider>
                <Router>
                  <App />
                </Router>
              </AuthProvider>
            </ActionControlProvider>
          </FilterProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
