export default function Navbar(){
    return (
      <nav className="nav p1">
        <h1>Brand Name</h1>
        <div className="menu">
          <button className="btn btn-icon icon-text-down">
            <i className="fas fa-shopping-cart icon-lg icon-badge">
              <span className="badge circle bdg-tr bdg-num bdg-blue">4</span>
            </i>
            <p className="mt05">Cart</p>
          </button>
          <button className="btn btn-icon icon-text-down mrl05">
            <i className="fas fa-heart icon-lg icon-badge colorRed">
              <span className="badge circle bdg-tr bdg-num bdg-blue">1</span>
            </i>
            <p className="mt05">Wishlist</p>
          </button>
        </div>
      </nav>
    );
}