import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mockServer from "./api/mock.server"
import {ProductProvider}  from "./components/product"
import {CartProvider} from "./components/cart"
import {NavProvider} from "./components/nav"

mockServer();

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

