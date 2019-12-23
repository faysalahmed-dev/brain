import { SET_USER_DATA, UPDATE_TOKEN } from "../actionTypes";

export const userInitialState = {
    data: null,
    token: null,
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };
        case UPDATE_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
};
