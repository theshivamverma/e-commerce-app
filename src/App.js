import { useState } from "react";
import {ProductList} from "./components/product";
import {CartList} from "./components/cart"

function App() {

  const [route, setRoute] = useState("product")

  return ( 
    <div className="App">
      <button className="btn btn-col btn-primary" onClick={() => setRoute("product")}>Products</button>
      <button className="btn btn-col btn-primary" onClick={() => setRoute("cart")}>Cart</button>
      {route === "product" && <ProductList />}
      {route === "cart" && <CartList />}
    </div>
  )
}

export default App;
