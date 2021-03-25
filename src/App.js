import {ProductList} from "./components/product";
import {CartList} from "./components/cart"
import { Navbar, useNav } from "./components/nav";
import WishlistList from "./components/wishlist/WishlistList";

function App() {

  const { route } = useNav();

  return (
    <div className="App">
      <Navbar />
      {route === "products" && <ProductList />}
      {route === "cart" && <CartList />}
      {route === "wishlist" && <WishlistList />}
    </div>
  );
}

export default App;
