import { useCart } from "../cart"
import { CartCard } from "../cart"

export default function CartList() {

    const { cartItems } = useCart()

    return(
        cartItems.length > 0 ? 
        <div class="stacked-list mt1">
            {cartItems.map(cartItem => {
                return <CartCard cartItem={cartItem} /> 
            })}
        </div> 
        : <h1 className="center">Your Cart is empty :(</h1>
    )
}