import { useState } from "react";

export default function Sidebar({ state, dispatch }) {
  const [menuState, setMenuState] = useState(false);
  return (
    <nav
      className={
        menuState ? "leftfixed-nav active p-1-0" : "leftfixed-nav p-1-0"
      }
      id="menu"
    >
      <button
        className="btn btn-col btn-secondary btn-float btn-menu"
        onClick={() => setMenuState(!menuState)}
      >
        <i className="fas fa-filter menu icon-med"></i>
      </button>
      <div className="top-element">
        <a href="/" className="logo">
          <img src="/images/panda.png" alt="" />
          <h3>Product Filters</h3>
        </a>
        <button
          className="m-0-05 btn btn-icon"
          id="menu-close"
          onClick={() => setMenuState(!menuState)}
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
            onChange={() => dispatch({ type: "SORT_LOW_TO_HIGH" })}
          />
        </span>
        <span className="groupinput">
          <label>High to Low</label>
          <input
            type="radio"
            name="sort"
            onChange={() => dispatch({ type: "SORT_HIGH_TO_LOW" })}
          />
        </span>
      </fieldset>
      <fieldset className="mt-1">
        <legend>Filter</legend>
        <span className="groupinput">
          <label>Include Out of Stock</label>
          <input
            type="checkbox"
            name="sort"
            onChange={() => dispatch({ type: "INCLUDE_OUT_OF_STOCK" })}
          />
        </span>
        <span className="groupinput">
          <label>Fast Delivery Only</label>
          <input
            type="checkbox"
            name="sort"
            onChange={() => dispatch({ type: "SHOW_FAST_DELIVERY_ONLY" })}
          />
        </span>
      </fieldset>
    </nav>
  );
}
