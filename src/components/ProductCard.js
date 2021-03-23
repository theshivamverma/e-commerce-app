import { useProduct } from "../contexts/product-context"

export default function ProductCard( { product } ){
    const { dispatch } = useProduct();
    return (
      <div className="card-product p1 card-shadow">
        <div className="product-img">
          <img src={product.image} alt="" />
        </div>
        <h1 className="product-heading mt1">
          {product.name}
          <i
            className={
              product.isWishlist
                ? `fas fa-heart wishlist active`
                : `fas fa-heart wishlist`
            }
            onClick={() => dispatch({ type: "ADDTOWISHLIST", payload: product })}
          ></i>
        </h1>
        <p className="product-desc mt05">{product.desc.substring(0, 20)}</p>
        <h2 className="price mt05">{`Rs. ${product.price}`}</h2>
        <div className="og-price">
          <span className="price-cut">{`Rs. ${product.actualPrice}`}</span>
          <span className="discount">(55% Off)</span>
        </div>
        <button className="btn btn-col btn-primary mt1 border-round">
          Add to Cart
        </button>
      </div>
    );
}