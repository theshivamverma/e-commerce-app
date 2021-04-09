import { useState } from "react";
import { useProduct } from "../product";

export default function Sidebar({ state, dispatch }) {
  const { products } = useProduct();

  const [priceLimit, setPriceLimit] = useState(19999)

  function getCategories(productList) {
    let categoryArr = [];
    productList.forEach((product) => {
      if (!categoryArr.includes(product.category)) {
        categoryArr.push(product.category);
      }
    });
    return categoryArr;
  }

  const categories = getCategories(products);

  function setCategory(e, categoryName){
    if(e.target.checked){
      dispatch({ type: "ADD_CATEGORY_TO_FILTER", payload: categoryName });
    } else{
      dispatch({ type: "REMOVE_CATEGORY_FROM_FILTER", payload: categoryName });
    }
  }

  return (
    <nav
      className={
        state.menuState ? "leftfixed-nav active p-1-0" : "leftfixed-nav p-1-0"
      }
      id="menu"
    >
      <div className="top-element">
        <a href="/" className="logo">
          <img src="/images/panda.png" alt="" />
          <h3>Product Filters</h3>
        </a>
        <button
          className="m-0-05 btn btn-icon"
          id="menu-close"
          onClick={() => dispatch({ type: "TOGGLE_MENUSTATE", payload: false })}
        >
          <i className="fas fa-times icon-med"></i>
        </button>
      </div>
      <fieldset>
        <legend>Sort by Price</legend>
        <span className="groupinput">
          <label>Low to High</label>
          <input
            type="radio"
            name="sort"
            onChange={() => dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
          />
        </span>
        <span className="groupinput">
          <label>High to Low</label>
          <input
            type="radio"
            name="sort"
            onChange={() => dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
          />
        </span>
      </fieldset>
      <fieldset className="mt-1">
        <legend>Filter</legend>
        <span className="groupinput">
          <label>Include Out of Stock</label>
          <input
            type="checkbox"
            name="filter"
            onChange={() => dispatch({ type: "INCLUDE_OUT_OF_STOCK" })}
          />
        </span>
        <span className="groupinput">
          <label>Fast Delivery Only</label>
          <input
            type="checkbox"
            name="filter"
            onChange={() => dispatch({ type: "SHOW_FAST_DELIVERY_ONLY" })}
          />
        </span>
      </fieldset>
      <fieldset className="mt-1">
        <legend>categories</legend>
        {categories.map((category, index) => {
          return (
            <span className="groupinput" key={index}>
              <label>{category}</label>
              <input
                type="checkbox"
                name="category"
                onChange={(e) => setCategory(e, category)}
              />
            </span>
          );
        })}
      </fieldset>
      <fieldset className="mt-1">
        <legend>Price range</legend>
        <span className="groupinput">
          <input
            className="price-slider"
            type="range"
            min="0"
            max="19999"
            value={priceLimit}
            step="50"
            onChange={(e) => {
              setPriceLimit(e.target.value)
              dispatch({ type: "SET_PRICE_RANGE", payload: e.target.value })
            }}
          />
        </span>
        <p className="font-size-m medium price-display">
          <span>0</span>
          <span>{priceLimit}</span>
        </p>
      </fieldset>
    </nav>
  );
}
