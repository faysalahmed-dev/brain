import React, { createContext, useReducer } from "react";
import {
  smartInitialState,
  smartReducer,
} from "../Reducers/SmartBrainReducers/SmartBarin.reducer";

export const SmartBrainContext = createContext();

export const SmartBrainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(smartReducer, smartInitialState);
  return (
    <SmartBrainContext.Provider value={{ state, dispatch }}>
      {children}
    </SmartBrainContext.Provider>
  );
};
