import { ProductCard } from "../product";
import Loader from "react-loader-spinner";

export default function ProductList({ products }) {
  return (
    <div className="grid-container web-four mob-two p2 mt2" style={{"position": "relative"}}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <Loader type="TailSpin" color="#002A46" height={50} width={50} className="loader" />
      )}
    </div>
  );
}
