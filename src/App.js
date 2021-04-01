import {ProductList} from "./components/product";
import {CartList} from "./components/cart"
import { Navbar, useNav } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";
import Sidebar from "./components/Sidebar/Sidebar";
import { useReducer } from "react";

function sortReducer(state, action){
  switch(action.type){
    case "INCLUDE_OUT_OF_STOCK":
      return {...state, includeOutofStock: !state.includeOutofStock}
    case "SHOW_FAST_DELIVERY_ONLY":
      return {...state, showFastDeliveryOnly: !state.showFastDeliveryOnly}
    case "SORT_LOW_TO_HIGH":
      return {...state, sort: "LOW_TO_HIGH"}
    case "SORT_HIGH_TO_LOW":
      return { ...state, sort: "HIGH_TO_LOW" }
    default:
      return;
  }
}

function App() {

  const [state, dispatch] = useReducer(sortReducer, {
    includeOutofStock: false,
    showFastDeliveryOnly: false,
    sort: null
  })

  const { route } = useNav();

  return (
    <div className="App">
      <Navbar />
      <Sidebar state={state} dispatch={dispatch}/>
      {route === "products" && <ProductList state={state}/>}
      {route === "cart" && <CartList />}
      {route === "wishlist" && <WishlistList />}
    </div>
  );
}

export default App;
