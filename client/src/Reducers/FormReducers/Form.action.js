import * as actionTypes from "../actionTypes";

export const onInputChange = (name, value) => ({
  type: name,
  payload: value,
});

export const toggleDisabledButton = payload => ({
  type: actionTypes.TOGGLE_THE_BUTTON,
  payload,
});
export const toggleTheLoader = payload => ({
  type: actionTypes.TOGGLE_THE_LOADER,
  payload,
});
export const clearInput = () => ({ type: actionTypes.CLEAR_INPUT });

export const errorLog = (key, val) => ({
  type: actionTypes.ERROR_LOG,
  payload: { [key]: val },
});
