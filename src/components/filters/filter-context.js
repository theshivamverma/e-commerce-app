import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../filters"

const FilterContext = createContext();

const initialState = {
  includeOutofStock: false,
  showFastDeliveryOnly: false,
  sort: null,
  categories: [],
  priceRange: 19999,
};

export function FilterProvider({ children }){

    const [ state, dispatch ] = useReducer(filterReducer, initialState);

    return (
        <FilterContext.Provider value={ { filterState: state, filterDispatch: dispatch } }>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter(){
    return useContext(FilterContext)
} 