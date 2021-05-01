import { ProductCard } from "../product";
import { useWishlist } from "../wishlist"
import { useAuth } from "../auth"
import { useEffect } from "react";

export default function WishlistList() {
  const { login } = useAuth()
  const { wishlist, setWishlistData, getWishlistData } = useWishlist()
  // useEffect(() => {
  //   setWishlistData()
  // }, [login])
  return wishlist.filter((wishlistItem) => wishlistItem.visible).length > 0 ? (
    <div className="wishlist-container grid-container web-four mob-two p2 mt2">
      {wishlist
        .filter((wishlistItem) => wishlistItem.visible)
        .map((wishlistItem) => (
          <ProductCard key={wishlistItem._id} product={wishlistItem.product} />
        ))}
    </div>
  ) : (
    <h1 class="center medium letter-spaced mt-4">No items in Wishlist</h1>
  );
}
