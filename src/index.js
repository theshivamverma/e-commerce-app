import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import mockServer from "./api/mock.server";
import { ProductProvider } from "./components/product";
import { CartProvider } from "./components/cart";
import { FilterProvider } from "./components/filters"
import { ActionControlProvider } from "./components/action-control"
import { BrowserRouter as Router } from "react-router-dom";

mockServer();

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <FilterProvider>
          <ActionControlProvider>
            <Router>
              <App />
            </Router>
          </ActionControlProvider>
        </FilterProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
