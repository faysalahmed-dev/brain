import { SET_USER, EDIT_MODE, ERROR_LOG } from "../actionTypes";

export const setUser = payload => ({
    type: SET_USER,
    payload,
});
export const errorLog = payload => ({
    type: ERROR_LOG,
    payload,
});
export const toggleEditMode = payload => ({ type: EDIT_MODE, payload });
