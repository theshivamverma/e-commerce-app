import { useProduct } from "../contexts/product-context"
import ProductCard from "./ProductCard"

export default function Product(){
    const { products }= useProduct()
    
    return (
        <div className="grid-container web-four mob-two p2 mt2">
            {
                products.map(product => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}