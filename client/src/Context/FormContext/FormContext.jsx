import React, { createContext } from "react";
import inputHook from "../../Hooks/InputHook";

export const FormContext = createContext();

export function FormContextProvider(props) {
  const inputValue = inputHook();
  return (
    <FormContext.Provider value={inputValue}>
      {props.children}
    </FormContext.Provider>
  );
}
