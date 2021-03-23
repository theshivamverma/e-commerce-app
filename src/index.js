import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mockServer from "./api/mock.server"
import {ProductProvider}  from "./components/product"
import {CartProvider} from "./components/cart"

mockServer();

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

