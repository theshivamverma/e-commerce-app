import { useProduct } from "../product";
import { ProductCard } from "../product";

export default function ProductList({ state }) {
  const { products } = useProduct();

  function getSortedData(productList, sort) {
    if (sort !== null && sort === "LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    if (sort !== null && sort === "HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    return productList;
  }

  function getFilteredData(productList, {includeOutofStock, showFastDeliveryOnly} ){
      return productList.filter(({ inStock }) => includeOutofStock ? true : inStock)
                        .filter(({fastDelivery}) => showFastDeliveryOnly ? fastDelivery : true)
  }

  const sortedData = getSortedData(products, state.sort);
  const filteredData = getFilteredData(sortedData, {
    includeOutofStock: state.includeOutofStock,
    showFastDeliveryOnly: state.showFastDeliveryOnly,
  });

  return (
    <div className="grid-container web-four mob-two p2 mt2">
      {filteredData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
