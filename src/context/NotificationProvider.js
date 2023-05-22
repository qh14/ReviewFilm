import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const NotificationContext = createContext();
let timeoutId;
export default function NotificationProvider({ children }) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  const [notification, setNotification] = useState("");
  const [colorNotification, setColorNotification] = useState("");
  const updateNotification = (type, value) => {
    switch (type) {
      case "success":
        setColorNotification("bg-green-500");
        break;
      case "warning":
        setColorNotification("bg-orange-500");
        break;
      case "error":
        setColorNotification("bg-red-500");
        break;
      default:
        setColorNotification("bg-red-500");
        break;
    }
    setNotification(value);
    timeoutId = setTimeout(() => {setNotification("")}, 3000);
  };
  return (
    <NotificationContext.Provider value={{updateNotification}}>
      {children}
      {notification && <div className="fixed left-1/2 -translate-x-1/2 top-24 bg-red-400 rounded">
        <div
          className={colorNotification + "text-white px-4 py-2 font-semibold"}
        >
          {notification}
        </div>
      </div>}
    </NotificationContext.Provider>
  );
}
