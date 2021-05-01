import { useState, useEffect } from "react";
import "./Toast.css"

import { useToast } from "../Toast"

export default function Toast() {

  const { toastList, position, autoDelete, time } = useToast()

  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, time);

    return () => {
      clearInterval(interval);
    };
  });

  function deleteToast(id) {
    const listItemIndex = list.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    setList([...list]);
  }

  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast) => (
          <div
            key={toast.id}
            className={`notification toast ${position} ${toast.category}`}
          >
            <div className="notification-image">
              <i class={`${toast.icon} mr-1 icon-med`}></i>
            </div>
            <div>
              <p className="notification-title">{toast.message}</p>
            </div>
            <button onClick={() => deleteToast(toast.id)}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}
