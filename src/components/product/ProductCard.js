import { useCart } from "../cart";
import { useProduct } from "../product";
import { useActionControl } from "../action-control";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductCard({ product }) {
  const { productDispatch } = useProduct();
  const { cartDispatch } = useCart();
  const { actionDispatch } = useActionControl();

  async function addToCartApi(data) {
    try {
      const { status } = await axios.post("/api/addToCart", {
        ...data,
      });
      if (status === 201) {
        cartDispatch({ type: "ADD_TO_CART", payload: data });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function clickHandler(data) {
    addToCartApi(data);
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
          onClick={() => {
            productDispatch({ type: "ADD_TO_WISHLIST", payload: product });
            actionDispatch({
              type: "SHOW_SUCCESS_TOAST",
              payload: {
                time: 1,
                message: product.isWishlist
                  ? "Item removed from wishlist"
                  : "Item added to wishlist",
                status: true,
              },
            });
          }}
        >
          <i
            className={
              product.isWishlist
                ? `fas fa-heart icon-sm wishlist-icon active`
                : `fas fa-heart icon-sm wishlist-icon`
            }
          ></i>
        </button>
      </div>
      <h1 className="product-heading mt-1">{product.description}</h1>
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
      {product.isAddedToCart === true ? (
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
          onClick={() => {
            clickHandler(product);
            productDispatch({ type: "ITEM_ADDED_TO_CART", payload: product });
          }}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
