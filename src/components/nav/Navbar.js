import { useCart } from "../cart";
import { useProduct } from "../product";
import { useNav } from "./nav-context";

export default function Navbar() {
  const { setRoute } = useNav();
  const { cartItems } = useCart();
  const { products } = useProduct();
  const wishListArr = products.filter((product) => product.isWishlist)
  return (
    <nav className="nav p1 top-fixed">
      <h1>Product waale</h1>
      <div className="menu">
        <button
          className="btn btn-icon icon-text-down"
          onClick={() => setRoute("products")}
        >
          <i className="fas fa-store icon-lg"></i>
          <p className="mt05">Store</p>
        </button>
        <button
          className="btn btn-icon icon-text-down ml1"
          onClick={() => setRoute("cart")}
        >
          <i className="fas fa-shopping-cart icon-lg icon-badge">
            {cartItems.length > 0 && (
              <span className="badge circle bdg-tr bdg-num bdg-blue">
                {cartItems.length}
              </span>
            )}
          </i>
          <p className="mt05">Cart</p>
        </button>
        <button
          className="btn btn-icon icon-text-down ml1"
          onClick={() => setRoute("wishlist")}
        >
          <i className="fas fa-heart icon-lg icon-badge colorRed">
            {wishListArr.length > 0 && (
              <span className="badge circle bdg-tr bdg-num bdg-blue">
                {wishListArr.length}
              </span>
            )}
          </i>
          <p className="mt05">Wishlist</p>
        </button>
      </div>
    </nav>
  );
}
