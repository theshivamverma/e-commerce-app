export default function actionControlReducer(state, action) {
  console.log({action})
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, menuState: action.payload };
    case "SHOW_SUCCESS_TOAST":
      return {
        ...state,
        showSuccessToast: action.payload.status,
        toastMessage: action.payload.message,
        toastInterval: action.payload.time,
      };
    default:
      return;
  }
}
