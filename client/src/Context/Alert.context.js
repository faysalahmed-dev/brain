import React, { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertContextPovider({ children }) {
  const [alert, setAlert] = useState({
    isShowAlert: false,
    message: "",
  });
  const showAlert = alrt => {
    setAlert({
      isShowAlert: typeof alrt === "boolean" ? alrt : true,
      message: typeof alrt === "string" ? alrt : "",
    });
  };
  if (alert.isShowAlert) setTimeout(() => showAlert(false), 2000);
  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
