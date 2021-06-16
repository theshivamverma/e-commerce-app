export function getSortedData(products, sort) {
  let productList = [...products]
  if (sort !== null && sort === "LOW_TO_HIGH") {
    return productList.sort((a, b) => a["price"] - b["price"]);
  }
  if (sort !== null && sort === "HIGH_TO_LOW") {
    return productList.sort((a, b) => b["price"] - a["price"]);
  }
  if(sort === null)
  return productList;
}

export function getFilteredData(
  productList,
  { includeOutofStock, showFastDeliveryOnly, categories, priceRange }
) {
  return productList
    .filter(({ inStock }) => (includeOutofStock ? true : inStock))
    .filter(({ fastDelivery }) => (showFastDeliveryOnly ? fastDelivery : true))
    .filter(({ category }) =>
      categories.length > 0
        ? categories.includes(category)
          ? category
          : false
        : category
    )
    .filter(({ price }) => (price <= priceRange ? price : false));
}