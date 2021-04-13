import { useState } from "react";
import { useActionControl } from "../../action-control";

export default function ToastSuccess() {
  const {
    actionState: { toastMessage, toastInterval }, actionDispatch
  } = useActionControl();

  const [time, setTime] = useState(toastInterval * 1000);

  if(time === 0){
    actionDispatch({
      type: "SHOW_SUCCESS_TOAST",
      payload: { time: 0, message: "", status: false },
    });
  }

  setTimeout(() => {
    if(time > 0){
      setTime(time - 1000);
    } 
  }, toastInterval * 1000);

  console.log({ toastInterval, toastMessage })

  return (
    <div
      class={
        time > 0
          ? "alert active p-1 bgLightGreen flex align-center justify-sb"
          : "alert p-1 bgLightGreen flex align-center justify-sb"
      }
    >
      <div class="alert-content flex align-center">
        <i class="fas fa-check-circle mr-1 icon-med alertgreen"></i>
        <p>{toastMessage}</p>
      </div>
      <i
        class="fas fa-times-circle icon-med alertgreen alert-close"
        onClick={() => setTime(0)}
      ></i>
    </div>
  );
}
