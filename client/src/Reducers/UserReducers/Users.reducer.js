import { SET_USER_DATA } from "../actionTypes";

export const userInitialState = {
  data: null,
  token: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
