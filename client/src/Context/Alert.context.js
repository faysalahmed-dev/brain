import React, { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertContextPovider({ children }) {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const showAlert = alrt => {
    setAlert({
      show: typeof alrt === "boolean" ? alrt : true,
      message: typeof alrt === "string" ? alrt : "",
    });
  };
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
