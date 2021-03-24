import { createContext, useContext, useEffect, useReducer } from "react"
import axios from "axios"
import {productReducer}  from "../product"

const ProductContext = createContext();

export function ProductProvider( { children } ){

    const [state, dispatch] = useReducer(productReducer, { products: [] });

    useEffect(() => {
        (
            async function(){
                try{
                    const { data, status } = await axios.get("/api/products")
                    if(status === 200){
                        console.log("Data found", data.products)
                        dispatch({type: "LOAD_DATA", payload: data.products})
                    }
                }catch(error){
                    console.log(error)
                }
            }
        )()
    }, [])

    return(
        <ProductContext.Provider value={ {products : state.products, productDispatch: dispatch} }>
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct(){
    return useContext(ProductContext);
}