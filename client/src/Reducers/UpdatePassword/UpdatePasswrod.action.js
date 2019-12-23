import { EDIT_MODE, CANCLE_EDIT } from "../actionTypes";

export const toggleMode = payload => ({
    type: EDIT_MODE,
    payload,
});
export const cancleEdit = () => ({
    type: CANCLE_EDIT,
});
