import { useCart } from "../cart";
import { useWishlist } from "../wishlist";
import { useState } from "react";
import { useToast } from "../utilities/Toast";
import { Link } from "react-router-dom"

export default function CartCard({ cartItem }) {
  const {
    cartDispatch,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
  } = useCart();
  const { wishlist, addToWishlist, wishlistDispatch } = useWishlist();
  const { callToast } = useToast();
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

  async function wishlistClickHandler(cartItem) {
    if (isInWishlist === false) {
      if (isInWishlistButInvisible) {
        wishlistDispatch({
          type: "ADD_EXISTING_TO_WISHLIST",
          payload: { wishlistItemId: currentWishlistItemId },
        });
      } else {
        wishlistDispatch({
          type: "ADD_NEWITEM_TO_WISHLIST",
          payload: { product: cartItem.product },
        });
      }
    }
    const { success } = await addToWishlist(cartItem.product._id);
    if(success){
      callToast("SUCCESS_TOAST", "Item moved to wishlist");
    }else{
      callToast("ERROR_TOAST", "Something went wrong !");
    }
  }

  async function removeClickHandler(cartItem){
    cartDispatch({
      type: "REMOVE_CART_ITEM",
      payload: { cartItemId: cartItem._id },
    });
    const { success } = await removeCartItem(cartItem.product._id);
    if (success) {
      callToast("SUCCESS_TOAST", "Item removed from cart");
    } else {
      callToast("ERROR_TOAST", "Something went wrong !");
    }
  }

  async function moveToWishlistClickHandler(cartItem){
    cartDispatch({
      type: "REMOVE_CART_ITEM",
      payload: { cartItemId: cartItem._id },
    });
    const { success } = await removeCartItem(cartItem.product._id);
    if (success) {
      callToast("SUCCESS_TOAST", "Item removed from cart");
    } else {
      callToast("ERROR_TOAST", "Something went wrong !");
    }
    wishlistClickHandler(cartItem);
  }

  async function incrementHandler(productId) {
    cartDispatch({
      type: "INCREASE_QUANTITY",
      payload: { cartItemId: cartItem._id },
    });
    const { success } = await increaseQuantity(productId);
    if (success) {
      callToast("SUCCESS_TOAST", "Item quantity increased");
    } else {
      callToast("ERROR_TOAST", "Something went wrong !");
    }
  }

  async function decrementHandler(productId){
    cartDispatch({
      type: "DECREASE_QUANTITY",
      payload: { cartItemId: cartItem._id },
    });
    const { success } = await decreaseQuantity(productId);
     if (success) {
       callToast("SUCCESS_TOAST", "Item quantity decreased");
     } else {
       callToast("ERROR_TOAST", "Something went wrong !");
     }
  }

  return (
    cartItem.visible && (
      <div className="card-cart p-1 mt-1 bdGray box-shadow-down">
        <div className="cart-details">
          <div className="cart-product-img">
            <img src={cartItem.product.images[0]} alt="" />
          </div>
          <div className="cart-product-desc">
            <Link to={`/products/${cartItem.product._id}`}>
              <h1 className="product-heading">{cartItem.product.name}</h1>
            </Link>
            <div className="change-quantity mt-05">
              <button
                className="btn btn-icon btn-cart"
                disabled={cartItem.quantity > 1 ? false : true}
                onClick={() => decrementHandler(cartItem.product._id)}
              >
                <i className="fas fa-minus icon-xxsm"></i>
              </button>
              <h2 className="quantity bd1 bdGray m-0-05">
                {cartItem.quantity}
              </h2>
              <button
                className="btn btn-icon btn-cart"
                onClick={() => incrementHandler(cartItem.product._id)}
              >
                <i className="fas fa-plus icon-xxsm"></i>
              </button>
            </div>
            <button
              className="btn btn-link colorRed mt-1"
              onClick={() => removeClickHandler(cartItem)}
            >
              Remove
            </button>
            <button
              className="btn btn-link ml-1 mt-1"
              onClick={() => moveToWishlistClickHandler(cartItem)}
            >
              Move to Wishlist
            </button>
          </div>
        </div>
        <div className="cart-product-price">
          <h2 className="price">{`Rs. ${cartItem.product.price}`}</h2>
          <span className="price-cut">{`Rs. ${cartItem.product.mrp}`}</span>
          <span className="discount">{`(${Math.floor(
            ((cartItem.product.mrp - cartItem.product.price) * 100) /
              cartItem.product.mrp
          )}% Off)`}</span>
        </div>
      </div>
    )
  );
}
