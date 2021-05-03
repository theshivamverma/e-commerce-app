import { useParams } from "react-router-dom";
import { useProduct } from "../product";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useCart } from "../cart";
import { Link } from "react-router-dom";
import { useWishlist } from "../wishlist";
import { useToast } from "../utilities/Toast";
import { useAuth } from "../auth";

export default function ProductDetail() {
  const { productId } = useParams();
  const { products } = useProduct();
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState();

  useEffect(() => {
    if (productId) {
      const value = products.find((item) => item._id === productId);
      if (value) {
        setProduct({ ...value });
        setMainImage(value.images[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, productId]);

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
    wishlist.forEach((wishlistItem) => {
      if (wishlistItem.product._id === product._id) {
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
    cartItems.forEach((cartItem) => {
      if (cartItem.product._id === product._id) {
        if (cartItem.visible === true) {
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
    if (product) {
      checkForWishlist();
      checkForCart();
    }
    return () => {
      setIsInCart(false);
      setIsInCartButInvisible(false);
      setInWishListButInvisible(false);
      setIsIncludedInWishlist(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, wishlist, cartItems]);

  function wishlistClickHandler(product) {
    if (login) {
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
    } else {
      toastDispatch({
        type: "INFO_TOAST",
        payload: "You are not logged in!",
      });
    }
  }

  function cartClickHandler(product) {
    if (login) {
      if (isInCartButInvisible) {
        cartDispatch({
          type: "ADD_EXISTING_TO_CART",
          payload: currentCartItemId,
        });
        toastDispatch({
          type: "SUCCESS_TOAST",
          payload: "Item added to cart",
        });
        addToCart(product._id);
      } else {
        cartDispatch({ type: "ADD_TO_CART", payload: product });
        toastDispatch({
          type: "SUCCESS_TOAST",
          payload: "Item added to cart",
        });
        addToCart(product._id);
      }
    } else {
      toastDispatch({
        type: "INFO_TOAST",
        payload: "You are not logged in!",
      });
    }
  }

  return product ? (
    <div className="product-detail p-4 flex pl-1">
      <div className="product-images flex">
        <div className="sub-images flex flex-column">
          {product.images
            .filter((image) => image !== "")
            .map((image) => {
              return (
                <div
                  className={
                    mainImage === image
                      ? "sub-image-container active mt-05 border-round"
                      : "sub-image-container mt-05 border-round"
                  }
                >
                  <img
                    alt=""
                    className="responsive-image"
                    src={image}
                    onMouseOver={() => setMainImage(image)}
                    onClick={() => setMainImage(image)}
                  />
                </div>
              );
            })}
        </div>
        <div className="main-image ml-2">
          <img alt="" className="responsive-image" src={mainImage} />
        </div>
      </div>
      <div className="product-description">
        <h1 className="detail-product-name">{product.name}</h1>
        <h2 className="detail-product-desc mt-05">{product.description}</h2>
        <div className="detail-rating flex align-center mt-05">
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
          <p className="m-0-1 font-size-sm">{product.ratings} Ratings</p>
          {product.tags[0] !== "" && (
            <span class="detail-tag border-round">{product.tags[0]}</span>
          )}
        </div>
        <div className="detail-price mt-05">
          <div className="flex align-center mt-02">
            <p className="">MRP :</p>
            <span className="ml-05 detail-price-mrp price-cut font-size-m">
              ₹ {product.mrp}
            </span>
          </div>
          <div className="flex align-center mt-02">
            <p>Price : </p>
            <span className="ml-05 detail-price-actual">₹ {product.price}</span>
          </div>
          <div className="flex align-center mt-02">
            <p>You Save :</p>
            <span className="ml-05 detail-price-discount discount">
              {`₹ ${product.mrp - product.price} (${Math.floor(
                ((product.mrp - product.price) * 100) / product.mrp
              )}%)`}
            </span>
          </div>
          <div className="flex align-center mt-02">
            <p></p>
            <span className="ml-05 detail-price-actual">
              Inclusive of all taxes
            </span>
          </div>
        </div>
        <p className="colorAlertGreen font-size-m mt-05">
          {product.inStock && "In Stock"}
        </p>
        <p className="colorAlertBlue font-size-sm mt-05">
          {product.freeDelivery && "Free delivery"}
        </p>
        <span className="review label font-size-sm bgLightBlue colorBlack mt-05 border-round">
          {product.fastDelivery ? "Super Fast Shipping" : "Regular Shipping"}
        </span>
        <div className="detail-buttons flex align-center">
          {isInCart === true ? (
            <Link to="/cart">
              <button className="btn btn-col btn-outline btn-primary mt-05 border-round">
                Go to Cart
                <i className="fas fa-arrow-right ml-05"></i>
              </button>
            </Link>
          ) : (
            <button
              disabled={!product.inStock}
              className="btn btn-col btn-outline btn-primary mt-05 border-round"
              onClick={() => cartClickHandler(product)}
              style={{
                backgroundColor: `${!product.inStock ? "#d2d2d2" : "#002A46"}`,
              }}
            >
              Add to Cart
              <i className="fas fa-shopping-cart ml-05"></i>
            </button>
          )}
          {isIncludedInWishlist === true && inWishlistButInvisible === false ? (
            <Link to="/wishlist">
              <button className="btn btn-outline mt-05 border-round ml-1">
                Go to Wishlist
                <i className="fas fa-heart colorAlertRed ml-05"></i>
              </button>
            </Link>
          ) : (
            <button
              className="btn btn-outline mt-05 border-round ml-1"
              onClick={() => wishlistClickHandler(product)}
            >
              Add to Wishlist
              <i className="fas fa-heart icon-sm wishlist-icon colorDarkGray ml-05"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader
      type="TailSpin"
      color="#002A46"
      height={50}
      width={50}
      className="loader"
    />
  );
}
