import { useCart } from "../cart";
import { Link, useLocation } from "react-router-dom";
import { useWishlist } from "../wishlist";
import { useAuth } from "../auth";

export default function Navbar({
  setShowFilterMenu,
  showProfilecard,
  setShowProfilecard,
}) {
  const { cartItems, cartDispatch } = useCart();
  const { wishlist, wishlistDispatch } = useWishlist();
  const { login, user, userLogout } = useAuth();
  const pathname = useLocation().pathname;
  return (
    <nav className="nav p-1 top-fixed box-shadow-down">
      <Link to="/">
        <div className="flex align-center">
          <img
            alt=""
            src="https://img.freepik.com/free-vector/hands-holding-heart-neon-sign_1262-15582.jpg?size=338&ext=jpg"
            className="brand-logo circle mr-1"
          />
          <h1 className="font-size-l light letter-spaced">The Healing Store</h1>
        </div>
      </Link>
      <div className="menu">
        <Link to="/products" state={{ page: "products" }}>
          <button className="btn btn-icon icon-text-down">
            <i className="fas fa-store icon-lg"></i>
            <p className="mt-05">Store</p>
          </button>
        </Link>
        <button
          className="btn btn-icon btn-filter icon-text-down"
          style={{
            display: `${pathname === "/products" ? "initial" : "none"}`,
          }}
          onClick={() => setShowFilterMenu(true)}
        >
          <i className="fas fa-filter icon-lg"></i>
          <p className="mt-05">Filter</p>
        </button>
        <Link to="/cart">
          <button className="btn btn-icon icon-text-down ml1">
            <i className="fas fa-shopping-cart icon-lg icon-badge">
              {cartItems.filter((cartItem) => cartItem.visible).length > 0 && (
                <span className="badge bd3 circle bdg-tr bdg-num bdg-blue">
                  {cartItems.filter((cartItem) => cartItem.visible).length}
                </span>
              )}
            </i>
            <p className="mt-05">Cart</p>
          </button>
        </Link>
        <Link to="/wishlist">
          <button className="btn btn-icon icon-text-down ml1">
            <i className="fas fa-heart icon-lg icon-badge colorRed">
              {wishlist.filter((wishlistItem) => wishlistItem.visible).length >
                0 && (
                <span className="badge bd3 circle bdg-tr bdg-num bdg-blue">
                  {
                    wishlist.filter((wishlistItem) => wishlistItem.visible)
                      .length
                  }
                </span>
              )}
            </i>
            <p className="mt-05">Wishlist</p>
          </button>
        </Link>
        <button
          className="btn btn-icon btn-filter icon-text-down"
          onClick={() => setShowProfilecard(!showProfilecard)}
        >
          <i className="fas fa-user icon-lg icon-lg"></i>
          <p className="mt-05">Profile</p>
        </button>
      </div>
      <div
        className={
          showProfilecard
            ? "profile-buttons active flex"
            : "profile-buttons flex"
        }
      >
        <button className="btn btn-icon icon-text-right">
          <i className="fas fa-user icon-lg"></i>
          <p style={{ textTransform: "initial" }}>
            {login ? (
              user.username && `Hi ${user.username}`
            ) : (
              <Link to="/login">Login</Link>
            )}
          </p>
        </button>
        {login && (
          <button
            className="btn btn-link ml-3"
            onClick={() => {
              userLogout();
              wishlistDispatch({
                type: "LOAD_DATA",
                payload: [],
              });
              wishlistDispatch({ type: "SET_WISHLIST_ID", payload: "" });
              cartDispatch({
                type: "LOAD_DATA",
                payload: [],
              });
              cartDispatch({ type: "SET_CART_ID", payload: "" });
            }}
          >
            Logout
          </button>
        )}
        <button
          className="btn btn-outline border-round"
          id="menu-close"
          onClick={() => setShowProfilecard(false)}
        >
          Close
        </button>
      </div>
    </nav>
  );
}
