import {
  TOGGLE_THE_LOADER,
  CLEAR_INPUT,
  ERROR_LOG,
  UPDATE_BOX,
  TOGGLE_MODEL,
} from "../actionTypes";

export const smartInitialState = {
  imgUrl: "",
  showLoader: false,
  error: null,
  showModel: false,
  box: {
    leftCol: null,
    topRow: null,
    rightCol: null,
    bottomRow: null,
  },
};

export const smartReducer = (state, action) => {
  switch (action.type) {
    case "imgUrl":
      return { ...state, imgUrl: action.payload };
    case CLEAR_INPUT:
      return { ...state, imgUrl: "" };
    case TOGGLE_THE_LOADER:
      return { ...state, showLoader: action.payload };
    case TOGGLE_MODEL:
      return { ...state, showModel: action.payload };
    case ERROR_LOG:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_BOX:
      return { ...state, box: action.payload };
    default:
      return state;
  }
};
