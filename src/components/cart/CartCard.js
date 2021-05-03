import { useCart } from "../cart";
import { useWishlist } from "../wishlist";
import { useState } from "react";
import { useToast } from "../utilities/Toast";

export default function CartCard({ cartItem }) {
  const {
    cartDispatch,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
  } = useCart();
  const { wishlist, addToWishlist, wishlistDispatch } = useWishlist();
  const { toastDispatch } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInWishlistButInvisible, setIsInWishlistButInvisible] = useState(
    false
  );
  const [currentWishlistItemId, setCurrentWishlistItemId] = useState("");

  function checkForWishlist() {
    wishlist.forEach((wishlistItem) => {
      if (wishlistItem.product._id === cartItem.product._id) {
        if (wishlistItem.visible === true) {
          setIsInWishlist(true);
        } else {
          setIsInWishlistButInvisible(true);
        }
        setCurrentWishlistItemId(wishlistItem._id);
      }
    });
  }

  useState(() => {
    checkForWishlist();
  }, [wishlist]);

  function wishlistClickHandler(cartItem) {
    if (isInWishlist === false) {
      if (isInWishlistButInvisible) {
        wishlistDispatch({
          type: "ADD_EXISTING_TO_WISHLIST",
          payload: currentWishlistItemId,
        });
      } else {
        wishlistDispatch({
          type: "ADD_NEWITEM_TO_WISHLIST",
          payload: cartItem.product,
        });
      }
    }
    addToWishlist(cartItem.product._id);
    toastDispatch({ type: "SUCCESS_TOAST", payload: "Item moved to wishlist" });
  }

  return (
    cartItem.visible && (
      <div className="card-cart p-1 mt-1 bdGray box-shadow-down">
        <div className="cart-details">
          <div className="cart-product-img">
            <img src={cartItem.product.images[0]} alt="" />
          </div>
          <div className="cart-product-desc">
            <h1 className="product-heading">{cartItem.product.name}</h1>
            <div className="change-quantity mt-05">
              <button
                className="btn btn-icon btn-cart"
                disabled={cartItem.quantity > 1 ? false : true}
                onClick={() => {
                  cartDispatch({
                    type: "DECREASE_QUANTITY",
                    payload: cartItem._id,
                  });
                  decreaseQuantity(cartItem.product._id);
                }}
              >
                <i className="fas fa-minus icon-xxsm"></i>
              </button>
              <h2 className="quantity bd1 bdGray m-0-05">
                {cartItem.quantity}
              </h2>
              <button
                className="btn btn-icon btn-cart"
                onClick={() => {
                  cartDispatch({
                    type: "INCREASE_QUANTITY",
                    payload: cartItem._id,
                  });
                  increaseQuantity(cartItem.product._id);
                }}
              >
                <i className="fas fa-plus icon-xxsm"></i>
              </button>
            </div>
            <button
              className="btn btn-link colorRed mt-1"
              onClick={() => {
                cartDispatch({
                  type: "REMOVE_CART_ITEM",
                  payload: cartItem._id,
                });
                toastDispatch({
                  type: "SUCCESS_TOAST",
                  payload: "Item removed from cart",
                });
                removeCartItem(cartItem.product._id);
              }}
            >
              Remove
            </button>
            <button
              className="btn btn-link ml-1 mt-1"
              onClick={() => {
                cartDispatch({
                  type: "REMOVE_CART_ITEM",
                  payload: cartItem._id,
                });
                removeCartItem(cartItem.product._id);
                wishlistClickHandler(cartItem);
              }}
            >
              Move to Wishlist
            </button>
          </div>
        </div>
        <div className="cart-product-price">
          <h2 className="price">{`Rs. ${cartItem.product.price}`}</h2>
          <span className="price-cut">{`Rs. ${cartItem.product.mrp}`}</span>
          <span className="discount">(55% Off)</span>
        </div>
      </div>
    )
  );
}
