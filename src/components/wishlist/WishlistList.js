import { useProduct }  from "../product"
import { ProductCard } from "../product"

export default function WishlistList(){
    const { products } = useProduct()
    return(
         <div className="grid-container web-four mob-two p2 mt2">
            {
                products.filter(product => product.isWishlist).map(product => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}