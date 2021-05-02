import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { status, data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/product`
        );
        if (status === 200) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
