import { useProduct } from "../product";
import { ProductCard } from "../product";

export default function WishlistList() {
  const { products } = useProduct();
  return products.filter((product) => product.isWishlist).length > 0 ? (
    <div className="grid-container web-four mob-two p2 mt2">
      {products
        .filter((product) => product.isWishlist)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  ) : (
    <h1 class="center medium letter-spaced mt-4">No items in Wishlist</h1>
  );
}
