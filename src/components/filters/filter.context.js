import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "."

const FilterContext = createContext();

export function FilterProvider({ children }){

    const initialState = {
      includeOutofStock: false,
      showFastDeliveryOnly: false,
      sort: null,
      categories: [],
      priceRange: 19999,
    };

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