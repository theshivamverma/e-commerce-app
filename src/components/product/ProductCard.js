import { useCart } from "../cart";
import { Link } from "react-router-dom";
import { useWishlist } from "../wishlist";
import { useEffect, useState } from "react";
import { useToast } from "../utilities/Toast";
import { useAuth } from "../auth"

export default function ProductCard({ product }) {
  const { login } = useAuth();
  const { cartItems, cartDispatch, addToCart } = useCart();
  const {
    wishlist,
    wishlistDispatch,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();
  const { toastDispatch } = useToast();
  const [isIncludedInWishlist, setIsIncludedInWishlist] = useState(false);
  const [inWishlistButInvisible, setInWishListButInvisible] = useState(false);
  const [currentWishlistItemId, setCurrentWishlistItemId] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [isInCartButInvisible, setIsInCartButInvisible] = useState(false);
  const [currentCartItemId, setCurrentCartItemId] = useState("");

  function checkForWishlist() {
    wishlist.map((wishlistItem) => {
      if (wishlistItem.product._id == product._id) {
        if (wishlistItem.visible === true) {
          setIsIncludedInWishlist(true);
        } else {
          setInWishListButInvisible(true);
        }
        if (wishlistItem._id) {
          setCurrentWishlistItemId(wishlistItem._id);
        }
      }
    });
  }

  function checkForCart() {
    cartItems.map((cartItem) => {
      if (cartItem.product._id == product._id) {
        if (cartItem.visible == true) {
          setIsInCart(true);
        } else {
          setIsInCartButInvisible(true);
        }
        if (cartItem._id) {
          setCurrentCartItemId(cartItem._id);
        }
      }
    });
  }

  useEffect(() => {
    checkForWishlist();
    checkForCart();
    return () => {
      setIsInCart(false);
      setIsInCartButInvisible(false);
      setInWishListButInvisible(false);
      setIsIncludedInWishlist(false);
    };
  }, [product, wishlist, cartItems]);

  function wishlistClickHandler(product) {
    if(login){
     if (isIncludedInWishlist) {
       setIsIncludedInWishlist(false);
       toastDispatch({
         type: "SUCCESS_TOAST",
         payload: "Item removed from wishlist",
       });
       wishlistDispatch({
         type: "REMOVE_FROM_WISHLIST",
         payload: currentWishlistItemId,
       });
       removeFromWishlist(product._id);
     } else {
       if (inWishlistButInvisible) {
         toastDispatch({
           type: "SUCCESS_TOAST",
           payload: "Item added to wishlist",
         });
         wishlistDispatch({
           type: "ADD_EXISTING_TO_WISHLIST",
           payload: currentWishlistItemId,
         });
         addToWishlist(product._id);
       } else {
         toastDispatch({
           type: "SUCCESS_TOAST",
           payload: "Item added to wishlist",
         });
         wishlistDispatch({
           type: "ADD_NEWITEM_TO_WISHLIST",
           payload: product,
         });
         addToWishlist(product._id);
       }
     } 
    }else{
        toastDispatch({
          type: "INFO_TOAST",
          payload: "You are not logged in!",
        });

    }
  }

  function cartClickHandler(product) {
    if(login){
      if (isInCartButInvisible) {
        cartDispatch({
          type: "ADD_EXISTING_TO_CART",
          payload: currentCartItemId,
        });
        toastDispatch({ type: "SUCCESS_TOAST", payload: "Item added to cart" });
        addToCart(product._id);
      } else {
        cartDispatch({ type: "ADD_TO_CART", payload: product });
        toastDispatch({ type: "SUCCESS_TOAST", payload: "Item added to cart" });
        addToCart(product._id);
      }
    }else{
        toastDispatch({ type: "INFO_TOAST", payload: "You are not logged in!" });
    }
  }

  return (
    <div className="card-product p-1 card-shadow">
      {/* {product.tags.length > 0 && product.tags[0] !== "" && (
        <div className="product-badge">
          {product.tags[0]}
          <span className="top-triangle"></span>
          <span className="bottom-triangle"></span>
        </div>
      )} */}
      {!product.inStock && <div className="product-badge">Out of Stock</div>}
      <div className="product-img">
        <img src={product.images[0]} alt="" />
        <button
          className="btn btn-icon wishlist"
          onClick={() => wishlistClickHandler(product)}
        >
          <i
            className={
              isIncludedInWishlist
                ? `fas fa-heart icon-sm wishlist-icon active`
                : `fas fa-heart icon-sm wishlist-icon`
            }
          ></i>
        </button>
      </div>
      <Link to={`/products/${product._id}`}>
        <h1 className="product-heading mt-1" style={{ height: "40px" }}>
          {product.name}
        </h1>
      </Link>
      <h2 className="price mt-05">{`Rs. ${product.price}`}</h2>
      <div className="og-price">
        <span className="price-cut">{`Rs. ${product.mrp}`}</span>
        <span className="discount">{`(${Math.floor(
          ((product.mrp - product.price) * 100) / product.mrp
        )}% Off)`}</span>
        <span
          className={`review ${
            product.rating >= 4
              ? "bgAlertGreen"
              : product.rating >= 3
              ? "bgAlertYellow"
              : "bgAlertRed"
          } colorWhite m-0-05 border-round`}
        >
          <span className="review-text">{product.rating}</span>
          <i className="fas fa-star"></i>
        </span>
      </div>
      <span className="review label font-size-sm bgLightBlue colorBlack mt-05 border-round">
        {product.fastDelivery ? "Super Fast Shipping" : "Regular Shipping"}
      </span>
      <p className="font-size-sm light">{product.brand}</p>
      {isInCart === true ? (
        <Link to="/cart">
          <button className="btn btn-col btn-primary mt-05 border-round btn-addtocart">
            Go to Cart
            <i className="fas fa-arrow-right ml-05"></i>
          </button>
        </Link>
      ) : (
        <button
          disabled={!product.inStock}
          className="btn btn-col btn-primary mt-05 border-round btn-addtocart"
          onClick={() => cartClickHandler(product)}
          style={{
            backgroundColor: `${!product.inStock ? "#d2d2d2" : "#002A46"}`,
          }}
        >
          Add to Cart
          <i className="fas fa-shopping-cart ml-05"></i>
        </button>
      )}
    </div>
  );
}
