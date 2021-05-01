import { useParams } from "react-router-dom"
import { useProduct } from "../product"
import { useEffect, useState } from "react"
import axios from "axios";
import env from "react-dotenv"

export default function ProductDetail(){
    const { productId } = useParams();
    const { products } = useProduct();

    const [ product, setProduct ] = useState();

    useEffect(async () => {
        console.log(productId)
        if(productId){
            try{
                const {status, data} = await axios.get(`${env.BASE_URL}/product/${productId}`)
                if(status === 200){
                    console.log(data.product)
                    setProduct(data.product)
                }
            }catch(error){
                console.log(error)
            }
        }
    }, [productId])

    return(
        <div>
            <h1>{product.name}</h1>
        </div>
    )
}