import { createContext, useContext, useReducer } from "react";
import { toastReducer } from "../Toast";

const ToastContext = createContext();

const intitialState = {
  list: [],
  position: "bottom-right",
  autoDelete: true,
  time: 1500,
};

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, intitialState);

   function callToast(toastType, toastMessage) {
     dispatch({
       type: toastType,
       payload: { message: toastMessage },
     });
   }


  return (
    <ToastContext.Provider
      value={{
        toastList: state.list,
        position: state.position,
        autoDelete: state.autoDelete,
        time: state.time,
        callToast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
