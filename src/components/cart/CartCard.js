import { useCart } from "../cart";
import { useProduct } from "../product";

export default function CartCard({ cartItem }) {
  const { cartDispatch } = useCart();
  const { productDispatch } = useProduct();

  return (
    <div className="card-cart p-1 bd1 bdGray">
      <div className="cart-details">
        <div className="cart-product-img">
          <img src={cartItem.image} alt="" />
        </div>
        <div className="cart-product-desc">
          <h1 className="product-heading">{cartItem.name}</h1>
          <p className="product-desc mt-05">{cartItem.desc.substring(0, 20)}</p>
          <div className="change-quantity mt-05">
            <button
              className="btn btn-icon btn-cart"
              disabled={cartItem.quantity > 1 ? false : true}
              onClick={() =>
                cartDispatch({ type: "DECREASE_QUANTITY", payload: cartItem })
              }
            >
              <i className="fas fa-minus icon-xxsm"></i>
            </button>
            <h2 className="quantity bd1 bdGray m-0-05">{cartItem.quantity}</h2>
            <button
              className="btn btn-icon btn-cart"
              onClick={() =>
                cartDispatch({ type: "INCREASE_QUANTITY", payload: cartItem })
              }
            >
              <i className="fas fa-plus icon-xxsm"></i>
            </button>
          </div>
          <button
            className="btn btn-link colorRed mt-1"
            onClick={() => {
              cartDispatch({ type: "REMOVE_CART_ITEM", payload: cartItem })
              productDispatch({ type: "ITEM_REMOVED_FROM_CART", payload: cartItem });
            }}
          >
            Remove
          </button>
          <button 
            className="btn btn-link ml-1 mt-1"
            onClick={() => {
              productDispatch({ type: "MOVE_TO_WISHLIST", payload: cartItem });
              cartDispatch({ type: "REMOVE_CART_ITEM", payload: cartItem });
              productDispatch({ type: "ITEM_REMOVED_FROM_CART", payload: cartItem });
            }}
          >
            Move to Wishlist
          </button>
        </div>
      </div>
      <div className="cart-product-price">
        <h2 className="price">{`Rs. ${cartItem.price}`}</h2>
        <span className="price-cut">{`Rs. ${cartItem.actualPrice}`}</span>
        <span className="discount">(55% Off)</span>
      </div>
    </div>
  );
}
