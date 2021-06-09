export function calculateTotalDiscount(cartItems){
    return cartItems
      .filter((cartItem) => cartItem.visible)
      .reduce(
        (total, item) =>
          (total =
            total + (item.product.mrp - item.product.price) * item.quantity),
        0
      );
}

export function calculateTotalPrice(cartItems){
    return cartItems
      .filter((cartItem) => cartItem.visible)
      .reduce(
        (total, item) => (total = total + item.product.price * item.quantity),
        0
      );
}

export function calculateTotalMrp(cartItems){
    return cartItems
      .filter((cartItem) => cartItem.visible)
      .reduce(
        (total, item) => (total = total + item.product.mrp * item.quantity),
        0
      );
}