import { UPDATE_BOX, ERROR_LOG, TOGGLE_MODEL } from "../actionTypes";

export const updateBox = payload => {
  return {
    type: UPDATE_BOX,
    payload,
  };
};
export const errorLog = payload => ({
  type: ERROR_LOG,
  payload,
});
export const toggleModel = payload => ({
  type: TOGGLE_MODEL,
  payload,
});
