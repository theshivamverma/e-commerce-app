import { useState } from "react";

export default function ToastSuccess({ timeInterval, message }) {
  const [time, setTime] = useState(timeInterval);

  setTimeout(() => setTime(time - 1000), timeInterval * 1000);

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
        <p>{message}</p>
      </div>
      <i
        class="fas fa-times-circle icon-med alertgreen alert-close"
        onClick={() => setTime(0)}
      ></i>
    </div>
  );
}
