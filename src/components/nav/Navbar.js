import { useCart } from "../cart";
import { useProduct } from "../product";
import { Link } from "react-router-dom"

export default function Navbar() {
  const { cartItems } = useCart();
  const { products } = useProduct();
  const wishListArr = products.filter((product) => product.isWishlist)
  return (
    <nav className="nav p-1 top-fixed box-shadow-down">
      <Link to="/">
        <h1>Hobby Mart</h1>
      </Link>
      <div className="menu">
        <Link to="/products" state={{ page: "products" }}>
          <button className="btn btn-icon icon-text-down">
            <i className="fas fa-store icon-lg"></i>
            <p className="mt-05">Store</p>
          </button>
        </Link>
        <Link to="/cart">
          <button className="btn btn-icon icon-text-down ml1">
            <i className="fas fa-shopping-cart icon-lg icon-badge">
              {cartItems.length > 0 && (
                <span className="badge circle bdg-tr bdg-num bdg-blue">
                  {cartItems.length}
                </span>
              )}
            </i>
            <p className="mt-05">Cart</p>
          </button>
        </Link>
        <Link to="/wishlist">
          <button className="btn btn-icon icon-text-down ml1">
            <i className="fas fa-heart icon-lg icon-badge colorRed">
              {wishListArr.length > 0 && (
                <span className="badge circle bdg-tr bdg-num bdg-blue">
                  {wishListArr.length}
                </span>
              )}
            </i>
            <p className="mt-05">Wishlist</p>
          </button>
        </Link>
      </div>
    </nav>
  );
}
