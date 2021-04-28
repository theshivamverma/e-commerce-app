import { useCart } from "../cart"
import { CartCard } from "../cart"

export default function CartList() {

    const { cartItems } = useCart()

    return cartItems.filter((cartItem) => cartItem.visible).length > 0 ? (
      <div class="stacked-list mt1">
        {cartItems.filter((cartItem) => cartItem.visible).map((cartItem) => {
          return <CartCard cartItem={cartItem} />;
        })}
      </div>
    ) : (
      <h1 className="center mt-4 letter-spaced medium">Your Cart is empty</h1>
    );
}