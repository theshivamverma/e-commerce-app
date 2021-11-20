import { ProductCard } from "../product";
import { useWishlist } from "../wishlist"

export default function WishlistList() {
  const { wishlist } = useWishlist()
  return wishlist.filter((wishlistItem) => wishlistItem.visible).length > 0 ? (
    <div className="wishlist-container grid-container web-four mob-two p2 mt2">
      {wishlist
        .filter((wishlistItem) => wishlistItem.visible)
        .map((wishlistItem) => (
          <ProductCard key={wishlistItem._id} product={wishlistItem.product} />
        ))}
    </div>
  ) : (
    <h1 className="center medium letter-spaced mt-4">No items in Wishlist</h1>
  );
}
