import { v4 as uuid } from "uuid"

export default function toastReducer(state, action){
    console.log(action)
    switch (action.type) {
      case "SUCCESS_TOAST":
        return {
          ...state,
          list: state.list.concat({
            id: uuid(),
            category: "success",
            message: action.payload,
            icon: "fas fa-check-circle alertgreen",
          }),
        };
      case "ERROR_TOAST":
        return {
          ...state,
          list: state.list.concat({
            id: uuid(),
            category: "error",
            message: action.payload,
            icon: "fas fa-exclamation-circle alertred",
          }),
        };
      case "INFO_TOAST":
        return {
          ...state,
          list: state.list.concat({
            id: uuid(),
            category: "info",
            message: action.payload,
            icon: "fas fa-info-circle alertblue",
          }),
        };
      case "WARNING_TOAST":
        return {
          ...state,
          list: state.list.concat({
            id: uuid(),
            category: "warning",
            message: action.payload,
            icon: "fas fa-exclamation-triangle alertyellow",
          }),
        };
      default:
          return {...state, list: []}
    }
}