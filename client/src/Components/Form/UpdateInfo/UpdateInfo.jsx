import React, { useReducer, useEffect, useContext } from "react";
import axios from "../../../axios/axios";
import { Link, withRouter } from "react-router-dom";

import FormInput from "../FormInput/FormInput";
import { userContext } from "../../../Context/User.context";
import { AlertContext } from "../../../Context/Alert.context";

import { InputButton } from "../../UI/Button/Button";
import Loader from "../../Loader/Loader";

import {
    onInputChange,
    toggleTheLoader,
    toggleDisabledButton,
} from "../../../Reducers/FormReducers/Form.action";
import { errorLog } from "../../../Reducers/UpdateInfoReducers/UpdateInfo.action";
import {
    setUser,
    toggleEditMode,
} from "../../../Reducers/UpdateInfoReducers/UpdateInfo.action";

import {
    updateInfoInitialState,
    updateInfoReducer,
} from "../../../Reducers/UpdateInfoReducers/UpdateInfo.reducer";

import { testInputValue } from "../../../Utils/Form";

import styles from "./UpdateInfo.module.scss";

const imgPath = "http://localhost:4000/img/";

const UpdateInfo = props => {
    const [state, dispatch] = useReducer(
        updateInfoReducer,
        updateInfoInitialState,
    );

    const {
        userImg,
        userName,
        isEditMode,
        showLoader,
        buttonIsDisabled,
        error,
    } = state;
    const {
        user: { data },
        updateData,
        removeUserData,
    } = useContext(userContext);
    const { showAlert } = useContext(AlertContext);
    const { name, email, photo, entries } = data;

    const setInput = () => {
        dispatch(onInputChange("userImg", imgPath + photo));
        dispatch(onInputChange("name", name));
    };
    useEffect(() => {
        dispatch(setUser(data));
        setInput();
    }, []);

    const handleCancel = () => {
        setInput();
        dispatch(toggleEditMode(false));
        dispatch(errorLog(null));
    };

    const handleUserImageChange = e => {
        const imgFile = e.target.files[0];
        dispatch(toggleEditMode(true));
        dispatch(onInputChange("userImg", window.URL.createObjectURL(imgFile)));
    };
    const handleInputChange = e => {
        if (isEditMode) {
            dispatch(onInputChange("name", e.target.value));
            const [, isError] = testInputValue("name", e.target.value);
            dispatch(errorLog(isError));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(toggleTheLoader(true));
        dispatch(toggleDisabledButton(true));
        if (
            (isEditMode && userName.trim() !== name) ||
            userImg.split("img/")[1] !== photo
        ) {
            const photo = document.querySelector("#photo").files[0];
            const userForm = new FormData();
            userForm.append("name", userName.trim());
            userForm.append("photo", photo);
            axios
                .put("/update-account", userForm)
                .then(res => {
                    if (res.data.status === "success") {
                        showAlert("account is updated");
                        updateData(res.data.data);
                        dispatch(toggleEditMode(false));
                    } else
                        showAlert(
                            "something went wrong. can not update account",
                        );
                })
                .catch(err => {
                    showAlert(err.response.data.message);
                    if (err.response.data.status === 401) {
                        // unauth
                        // clear the local stroge
                        // clear the state
                        removeUserData();
                        // redirct to the home page
                        props.history.replace("/");
                    }
                })
                .finally(() => {
                    dispatch(toggleDisabledButton(false));
                    dispatch(toggleTheLoader(false));
                });
        } else {
            dispatch(toggleTheLoader(false));
            dispatch(toggleDisabledButton(false));
        }
    };
    return (
        <form className={styles.Update_info} onSubmit={handleSubmit}>
            <div className={styles.Update_info__img_box}>
                <input
                    className={styles.Update_info__upload}
                    type="file"
                    accept="image/png, image/jpeg"
                    id="photo"
                    name="photo"
                    onChange={handleUserImageChange}
                />
                <label htmlFor="photo" className={styles.Update_info__photo}>
                    <img src={userImg} alt="avater photo" />
                </label>
                <div>
                    <p>
                        Your Total Count : <span>{entries}</span>
                    </p>
                    <Link to="/history">see all history</Link>
                </div>
            </div>
            <FormInput
                type="text"
                name="name"
                value={userName}
                onChange={handleInputChange}
                className={error === null ? null : error ? "error" : "success"}
            />
            <FormInput type="email" name="email" value={email} disabled />
            {isEditMode ? (
                <div className={styles.Update_info__button_group}>
                    <InputButton onClick={handleCancel}>Cancle</InputButton>
                    <InputButton
                        style={{ opacity: showLoader ? 0.7 : 1 }}
                        type="submit"
                        disabled={buttonIsDisabled}
                    >
                        <span>{showLoader ? "Saveing.." : "Save"}</span>
                        {showLoader && <Loader />}
                    </InputButton>
                </div>
            ) : (
                <InputButton onClick={() => dispatch(toggleEditMode(true))}>
                    Edit
                </InputButton>
            )}
        </form>
    );
};
export default withRouter(UpdateInfo);
