import { useCart } from "../cart";
import { useActionControl } from "../action-control";
import { Link } from "react-router-dom";
import axios from "axios";
import { useWishlist } from "../wishlist"
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const { cartItems, cartDispatch, addToCart } = useCart();
  const { actionDispatch } = useActionControl();
  const { wishlist, wishlistDispatch, addToWishlist, removeFromWishlist } = useWishlist();
  const [isIncludedInWishlist, setIsIncludedInWishlist] = useState(false)
  const [inWishlistButInvisible, setInWishListButInvisible] = useState(false)
  const [currentWishlistItemId, setCurrentWishlistItemId] = useState("")
  const [isInCart, setIsInCart] = useState(false)
  const [isInCartButInvisible, setIsInCartButInvisible] = useState(false)
  const [currentCartItemId, setCurrentCartItemId] = useState("")

  function checkForWishlist(){
    wishlist.map((wishlistItem) => {
      if (wishlistItem.product._id == product._id) {
        if (wishlistItem.visible === true){
          setIsIncludedInWishlist(true);
        }else{
          setInWishListButInvisible(true);
        }
        if(wishlistItem._id){
          setCurrentWishlistItemId(wishlistItem._id);
        }
      }
    });
  }

  function checkForCart(){
    cartItems.map(cartItem => {
      if(cartItem.product._id == product._id){
        if(cartItem.visible == true){
          setIsInCart(true)
        }else{
          setIsInCartButInvisible(true)
        }
        if(cartItem._id){
          setCurrentCartItemId(cartItem._id)
        }
      }
    })
  }

  useEffect(() => {
    checkForWishlist()
    checkForCart()
  }, [wishlist, cartItems])

  function wishlistClickHandler(product){
    if(isIncludedInWishlist){
      setIsIncludedInWishlist(false)
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: currentWishlistItemId})
      removeFromWishlist(product._id)
    } else{
      if(inWishlistButInvisible){
        wishlistDispatch({ type: "ADD_EXISTING_TO_WISHLIST", payload: currentWishlistItemId})
        addToWishlist(product._id)
      }else{
        wishlistDispatch({ type: "ADD_NEWITEM_TO_WISHLIST", payload: product });
        addToWishlist(product._id)
      }
    }
    actionDispatch({
      type: "SHOW_SUCCESS_TOAST",
      payload: {
        time: 1,
        message: isIncludedInWishlist
          ? "Item removed from wishlist"
          : "Item added to wishlist",
        status: true,
      },
    });
  }

  function cartClickHandler(product) {
    if(isInCartButInvisible){
      cartDispatch({ type: "ADD_EXISTING_TO_CART", payload: currentCartItemId });
      addToCart(product._id)
    }else{
      cartDispatch({ type: "ADD_TO_CART", payload: product });
      addToCart(product._id)
    }
    actionDispatch({
      type: "SHOW_SUCCESS_TOAST",
      payload: { time: 1, message: "Item added to cart", status: true },
    });
  }

  return (
    <div className="card-product p-1 card-shadow">
      <div className="product-img">
        <img src={product.images[0]} alt="" />
        <button
          class="btn btn-icon wishlist"
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
      <Link to={`/products/${product.id}`}>
        <h1 className="product-heading mt-1">{product.name}</h1>
      </Link>
      {/* <p className="product-desc mt-05">{product.subDescription.substring(0, 20)}</p> */}
      <h2 className="price mt-05">{`Rs. ${product.price}`}</h2>
      <div className="og-price">
        <span className="price-cut">{`Rs. ${product.mrp}`}</span>
        <span className="discount">(55% Off)</span>
      </div>
      <p class="font-size-sm light">
        {product.inStock ? "Available" : "Not in stock"}
      </p>
      <p class="font-size-sm light">
        {product.fastDelivery ? "Super Fast Delivery" : "Regular Shipping"}
      </p>
      <p class="font-size-sm light">{product.brand}</p>
      {isInCart === true ? (
        <>
          <Link to="/cart">
            <button className="btn btn-col btn-secondary mt-1 border-round btn-addtocart">
              Go to Cart
            </button>
          </Link>
        </>
      ) : (
        <button
          className="btn btn-col btn-primary mt-1 border-round"
          onClick={() => cartClickHandler(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
