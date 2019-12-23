import {
    EDIT_MODE,
    CLEAR_INPUT,
    ERROR_LOG,
    TOGGLE_THE_LOADER,
    TOGGLE_THE_BUTTON,
    CANCLE_EDIT,
} from "../actionTypes";
export const initalState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
    buttonIsDisabled: "",
    isEditMode: false,
    showLoader: false,
    error: {
        password: null,
        newPassword: null,
        confirmPassword: null,
    },
};

export const updatePasswordReducer = (state, action) => {
    switch (action.type) {
        case "password":
            return { ...state, password: action.payload };
        case "newPassword":
            return { ...state, newPassword: action.payload };
        case "confirmPassword":
            return { ...state, confirmPassword: action.payload };
        case CLEAR_INPUT:
            return {
                ...state,
                password: "",
                newPassword: "",
                confirmPassword: "",
            };
        case CANCLE_EDIT:
            return { ...initalState };
        case EDIT_MODE:
            return { ...state, isEditMode: action.payload };
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
