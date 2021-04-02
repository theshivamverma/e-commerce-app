import { useCart } from "../cart";
import { useNav } from "../nav";
import {useProduct} from "../product"

export default function ProductCard( { product } ){
    const { productDispatch } = useProduct();
    const { cartDispatch } = useCart();
    const { setRoute } = useNav();
    return (
      <div className="card-product p-1 card-shadow">
        <div className="product-img">
          <img src={product.image} alt="" />
          <button
            class="btn btn-icon wishlist"
            onClick={() =>
              productDispatch({ type: "ADD_TO_WISHLIST", payload: product })
            }
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
        <h1 className="product-heading mt-1">{product.name}</h1>
        <p className="product-desc mt-05">{product.desc.substring(0, 20)}</p>
        <h2 className="price mt-05">{`Rs. ${product.price}`}</h2>
        <div className="og-price">
          <span className="price-cut">{`Rs. ${product.actualPrice}`}</span>
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
          <button
            className="btn btn-col btn-secondary mt-1 border-round"
            onClick={() => setRoute("cart")}
          >
            Go to Cart
          </button>
        ) : (
          <button
            className="btn btn-col btn-primary mt-1 border-round"
            onClick={() => {
              cartDispatch({ type: "ADD_TO_CART", payload: product });
              productDispatch({ type: "ITEM_ADDED_TO_CART", payload: product });
              console.log({ product });
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
}