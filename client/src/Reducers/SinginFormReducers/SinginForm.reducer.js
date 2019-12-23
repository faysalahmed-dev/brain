import {
    TOGGLE_THE_BUTTON,
    TOGGLE_THE_LOADER,
    CLEAR_INPUT,
    ERROR_LOG,
} from "../actionTypes";

export const initialState = {
    email: "",
    password: "",
    buttonIsDisabled: true,
    showLoader: false,
    error: {
        email: null,
        password: null,
    },
};
// action must have to type property
export const formReducer = (state, action) => {
    switch (action.type) {
        case "email":
            return { ...state, email: action.payload };
        case "password":
            return { ...state, password: action.payload };
        case CLEAR_INPUT:
            return { ...state, email: "", password: "" };
        case TOGGLE_THE_BUTTON:
            return { ...state, buttonIsDisabled: action.payload };
        case TOGGLE_THE_LOADER:
            return { ...state, showLoader: action.payload };
        case ERROR_LOG:
            return {
                ...state,
                error: {
                    ...state.error,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
