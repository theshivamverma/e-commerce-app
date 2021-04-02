import { ProductCard } from "../product";

export default function ProductList({ products }) {

  return (
    <div className="grid-container web-four mob-two p2 mt2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
