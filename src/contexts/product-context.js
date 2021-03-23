import { createContext, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios"

const ProductContext = createContext();

const productReducer = (state, action) => {
    switch(action.type){
        case "LOADDATA":
            return {...state, products: action.payload}
        case "ADDTOWISHLIST":
            return {
                ...state, 
                products: state.products.map(product => {
                    if(product.id === action.payload.id){
                       return {
                         ...product,
                         isWishlist: !action.payload.isWishlist,
                       };
                    }
                    else return product
                })
            }
        default: 
            return
    }
}

export function ProductProvider( { children } ){

    const [state, dispatch] = useReducer(productReducer, { products: [] });

    useEffect(() => {
        (
            async function(){
                try{
                    const { data, status } = await axios.get("/api/products")
                    if(status === 200){
                        console.log("Data found", data.products)
                        dispatch({type: "LOADDATA", payload: data.products})
                    }
                }catch(error){
                    console.log(error)
                }
            }
        )()
    }, [])

    return(
        <ProductContext.Provider value={ {products : state.products, dispatch} }>
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct(){
    return useContext(ProductContext);
}