export default function CartCard(){
    return (
      <div className="card-cart p1 bd1 bdGray">
        <div className="cart-details">
          <div className="cart-product-img">
            <img
              src="https://images.unsplash.com/photo-1570128641432-a1520efe3b1d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80"
              alt=""
            />
          </div>
          <div className="cart-product-desc">
            <h1 className="product-heading">Levis</h1>
            <p className="product-desc mt05">Men Slim Fit Casual Shirt</p>
            <div className="change-quantity mt05">
              <button className="btn btn-icon btn-cart">
                <i className="fas fa-minus icon-xxsm"></i>
              </button>
              <h2 className="quantity bd1 bdGray mrl05">1</h2>
              <button className="btn btn-icon btn-cart">
                <i className="fas fa-plus icon-xxsm"></i>
              </button>
            </div>
            <button className="btn btn-link colorRed mt1">Remove</button>
            <button className="btn btn-link ml1 mt1">Move to Wishlist</button>
          </div>
        </div>
        <div className="cart-product-price">
          <h2 className="price">Rs 999</h2>
          <span className="price-cut">Rs. 1999</span>
          <span className="discount">(55% Off)</span>
        </div>
      </div>
    );
}