import React, { createContext, useReducer } from "react";
import {
  getUserFromLs,
  saveUserInLs,
  deleteUserFormLs,
  updateDataLs,
} from "../Utils/localStorge";
import {
  userInitialState,
  userReducer,
} from "../Reducers/UserReducers/Users.reducer";
import { setUserdata } from "../Reducers/UserReducers/Users.action";

export const userContext = createContext(getUserFromLs() || userInitialState);

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(
    userReducer,
    getUserFromLs() || userInitialState,
  );
  const setUserData = (data, token) => {
    saveUserInLs(data, token);
    dispatch(setUserdata({ data, token }));
  };
  const removeUserData = () => {
    deleteUserFormLs();
    dispatch(setUserdata({ data: null, token: null }));
  };
  const updateData = newData => {
    updateDataLs(newData);
    dispatch(setUserdata({ ...user, data: newData }));
  };
  return (
    <userContext.Provider
      value={{ user, setUserData, removeUserData, updateData }}
    >
      {children}
    </userContext.Provider>
  );
};
