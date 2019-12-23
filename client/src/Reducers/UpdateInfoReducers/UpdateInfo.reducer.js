import {
    TOGGLE_THE_BUTTON,
    TOGGLE_THE_LOADER,
    ERROR_LOG,
    SET_USER,
    EDIT_MODE,
} from "../actionTypes";

// state = {
//     userImg: imgPath + this.context.user.data.photo,
//     userName: this.context.user.data.name,
//     user: this.context.user.data,
//     isEditMode: false,
//     showLoader: false,
// };

export const updateInfoInitialState = {
    userImg: "",
    userName: "",
    user: {},
    isEditMode: false,
    buttonIsDisabled: false,
    showLoader: false,
    error: null,
};

export const updateInfoReducer = (state, action) => {
    switch (action.type) {
        case "name":
            return { ...state, userName: action.payload };
        case "userImg":
            return { ...state, userImg: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case TOGGLE_THE_BUTTON:
            return { ...state, buttonIsDisabled: action.payload };
        case EDIT_MODE:
            return { ...state, isEditMode: action.payload };
        case TOGGLE_THE_LOADER:
            return { ...state, showLoader: action.payload };
        case ERROR_LOG:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
