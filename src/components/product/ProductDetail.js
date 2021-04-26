import { useParams } from "react-router-dom"
import { useProduct } from "../product"
import { useEffect, useState } from "react"

export default function ProductDetail(){
    const { productId } = useParams();
    const { products } = useProduct();

    const [ product, setProduct ] = useState();

    useEffect(() => {
        setProduct(() => products.filter(prod => prod.id === productId))
    },[product])

    return(
        <div>
            <h1>{product}</h1>
        </div>
    )
}