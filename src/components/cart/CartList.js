import { useCart } from "../cart";
import { CartCard } from "../cart";

import {
  calculateTotalDiscount,
  calculateTotalMrp,
  calculateTotalPrice,
} from "../utilities/helper-functions/cartOperations";

export default function CartList() {
  const { cartItems } = useCart();

  const totalPrice = calculateTotalPrice(cartItems);

  const totalMrp = calculateTotalMrp(cartItems);

  const totalDiscount = calculateTotalDiscount(cartItems);

  return cartItems.filter((cartItem) => cartItem.visible).length > 0 ? (
    <div className="cart-page">
      <div className="cart-items stacked-list mt1">
        <div className="items-header flex justify-sb p-0-1 pt-1">
          <h1 className="font-size-m light">
            My Cart({cartItems.filter((cartItem) => cartItem.visible).length})
            items
          </h1>
          <h1 className="font-size-m light">Total: Rs. {totalPrice}</h1>
        </div>
        {cartItems
          .filter((cartItem) => cartItem.visible)
          .map((cartItem) => {
            return <CartCard key={cartItem._id} cartItem={cartItem} />;
          })}
      </div>
      <div className="cart-info p-1-0">
        <h1 className="font-size-m center light">Price Details</h1>
        <div className="pricing-details box-shadow-down mt-1 p-1">
          <div className="mrp flex justify-sb">
            <h1 className="font-size-sm light">Total MRP</h1>
            <h1 className="font-size-sm light">Rs. {totalMrp}</h1>
          </div>
          <div className="discount-info flex justify-sb mt-1">
            <h1 className="font-size-sm light">Total Discount on MRP</h1>
            <h1 className="font-size-sm light colorAlertGreen">
              - Rs. {totalDiscount}
            </h1>
          </div>
          <hr className="m-1-0" style={{ opacity: "0.2" }} />
          <div className="price-info flex justify-sb mt-1">
            <h1 className="font-size-m light">Amount</h1>
            <h1 className="font-size-m light">Rs. {totalPrice}</h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="center mt-4 letter-spaced medium">Your Cart is empty</h1>
  );
}
