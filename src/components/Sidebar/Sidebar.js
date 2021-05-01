import { useEffect, useState } from "react";
import { useProduct } from "../product";
import { useFilter } from "../filters";

export default function Sidebar({ showFilterMenu, setShowFilterMenu }) {
  const { products } = useProduct();

  const {
    filterState: {
      includeOutofStock,
      showFastDeliveryOnly,
      sort,
      categories,
      priceRange,
    },
    filterDispatch,
  } = useFilter();

  const maxPrice = products.reduce(
    (max, product) => (product.price > max ? product.price : max),
    0
  );

  const [priceLimit, setPriceLimit] = useState(0);

  useEffect(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);

  function getCategories(productList) {
    let categoryArr = [];
    productList.forEach((product) => {
      if (!categoryArr.includes(product.category)) {
        categoryArr.push(product.category);
      }
    });
    return categoryArr;
  }

  const productCategories = getCategories(products);

  function setCategory(e, categoryName) {
    if (e.target.checked) {
      filterDispatch({ type: "ADD_CATEGORY_TO_FILTER", payload: categoryName });
    } else {
      filterDispatch({
        type: "REMOVE_CATEGORY_FROM_FILTER",
        payload: categoryName,
      });
    }
  }

  return (
    <nav
      className={
        showFilterMenu ? "leftfixed-nav active p-1-0" : "leftfixed-nav p-1-0"
      }
      id="menu"
    >
      <h3>Product Filters</h3>
      <div className="top-element">
        <button
          className="btn btn-outline border-round btn-filter"
          onClick={() => setShowFilterMenu(false)}
        >
          Apply
        </button>
        <button
          className="btn btn-outline border-round"
          id="menu-close"
          onClick={() => setShowFilterMenu(false)}
        >
          Close
        </button>
      </div>
      <div className="filter-card box-shadow-down p-1 mt-05">
        <p className="font-size-sm letter-spaced uppercase">Sort by Price</p>
        <span className="groupinput mt-05">
          <label>Low to High</label>
          <input
            type="radio"
            name="sort"
            checked={sort === "LOW_TO_HIGH"}
            onChange={() =>
              filterDispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
            }
          />
        </span>
        <span className="groupinput">
          <label>High to Low</label>
          <input
            type="radio"
            name="sort"
            checked={sort === "HIGH_TO_LOW"}
            onChange={() =>
              filterDispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
            }
          />
        </span>
        <button
          className="btn btn-outline border-round mt-05 font-size-xsm"
          onClick={() => filterDispatch({ type: "CLEAR_SORT_FILTER" })}
        >
          Clear Sort
        </button>
      </div>
      <div className="filter-card box-shadow-down p-1 mt-1">
        <p className="font-size-sm letter-spaced uppercase">Availabilty</p>
        <span className="groupinput">
          <label>Include Out of Stock</label>
          <input
            type="checkbox"
            name="filter"
            checked={includeOutofStock}
            onChange={() => filterDispatch({ type: "INCLUDE_OUT_OF_STOCK" })}
          />
        </span>
        <span className="groupinput">
          <label>Fast Delivery Only</label>
          <input
            type="checkbox"
            name="filter"
            checked={showFastDeliveryOnly}
            onChange={() => filterDispatch({ type: "SHOW_FAST_DELIVERY_ONLY" })}
          />
        </span>
      </div>
      <div className="filter-card box-shadow-down p-1 mt-1">
        <p className="font-size-sm letter-spaced uppercase">categories</p>
        {productCategories.map((category, index) => {
          return (
            <span className="groupinput" key={index}>
              <label>{category}</label>
              <input
                type="checkbox"
                name="category"
                checked={categories.includes(category)}
                onChange={(e) => setCategory(e, category)}
              />
            </span>
          );
        })}
      </div>
      <div className="filter-card box-shadow-down p-1 mt-1">
        <p className="font-size-sm letter-spaced uppercase">Price range</p>
        <span className="groupinput">
          <input
            className="mt-1"
            type="range"
            min="0"
            max="19999"
            value={priceLimit}
            step="499"
            onChange={(e) => {
              setPriceLimit(e.target.value);
              filterDispatch({
                type: "SET_PRICE_RANGE",
                payload: e.target.value,
              });
            }}
          />
        </span>
        <p className="font-size-m medium price-display">
          <span>0</span>
          <span>{priceLimit}</span>
        </p>
      </div>
    </nav>
  );
}
