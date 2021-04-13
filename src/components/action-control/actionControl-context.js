import { createContext, useContext, useReducer } from "react"
import { actionControlReducer } from "../action-control"

const ActionControlContext = createContext();

const initialState = {
  menuState: false,
  showSuccessToast: false,
  toastMessage: "",
  toastInterval: 0,
  showLoader: false,
};

export function ActionControlProvider({ children }){

    const [ state, dispatch ] = useReducer(actionControlReducer, initialState)

    return(
        <ActionControlContext.Provider value={ { actionState: state, actionDispatch: dispatch } } >
            { children }
        </ActionControlContext.Provider>
    )
}

export function useActionControl(){
    return useContext(ActionControlContext);
}