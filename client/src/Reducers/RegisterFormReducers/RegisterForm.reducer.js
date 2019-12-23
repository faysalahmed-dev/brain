import {
    TOGGLE_THE_BUTTON,
    TOGGLE_THE_LOADER,
    CLEAR_INPUT,
    ERROR_LOG,
} from "../actionTypes";

export const registerInitialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonIsDisabled: true,
    showLoader: false,
    error: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
    },
};

export const registerFormReducer = (state, action) => {
    switch (action.type) {
        case "name":
            return { ...state, name: action.payload };
        case "email":
            return { ...state, email: action.payload };
        case "password":
            return { ...state, password: action.payload };
        case "confirmPassword":
            return { ...state, confirmPassword: action.payload };
        case CLEAR_INPUT:
            return {
                ...state,
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            };
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
