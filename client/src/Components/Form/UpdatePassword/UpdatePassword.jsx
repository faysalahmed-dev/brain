import React, { useReducer, useContext, useEffect } from "react";
import { InputButton } from "../../UI/Button/Button";
import Loader from "../../Loader/Loader";
import axios from "../../../axios/axios";
import { AlertContext } from "../../../Context/Alert.context";
import FormInput from "../FormInput/FormInput";
import { testInputValue, buttonDisabledOrNot } from "../../../Utils/Form";
import { userContext } from "../../../Context/User.context";
import {
    initalState,
    updatePasswordReducer,
} from "../../../Reducers/UpdatePassword/UpdatePassword.reducer";
import {
    toggleMode,
    cancleEdit,
} from "../../../Reducers/UpdatePassword/UpdatePasswrod.action";
import {
    toggleDisabledButton,
    toggleTheLoader,
    onInputChange,
    errorLog,
} from "../../../Reducers/FormReducers/Form.action";
import styles from "../Form.module.scss";

const UpdatePassword = () => {
    const [state, dispatch] = useReducer(updatePasswordReducer, initalState);
    const {
        password,
        newPassword,
        confirmPassword,
        buttonIsDisabled,
        isEditMode,
        showLoader,
        error,
    } = state;
    const {
        user: { data },
        setUserData,
    } = useContext(userContext);
    const { showAlert } = useContext(AlertContext);

    const handleChange = e => {
        const { name, value } = e.target;
        if (!isEditMode) dispatch(toggleMode(true));
        dispatch(onInputChange(name, value));
        const [, isError] = testInputValue(name, value, newPassword);
        dispatch(errorLog(name, isError));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(toggleTheLoader(true));
        dispatch(toggleDisabledButton(true));
        axios
            .put("/update-password", { password, newPassword })
            .then(res => {
                if (!res) return;
                if (res.data.status === "success") {
                    showAlert("password is updated");
                    dispatch(cancleEdit());
                    setUserData(data, res.data.token);
                } else {
                    showAlert("something went wrong.password is not updated");
                }
            })
            .catch(err => showAlert(err.response.data.message))
            .finally(() => {
                dispatch(toggleTheLoader(false));
                dispatch(toggleDisabledButton(false));
            });
    };

    useEffect(() => {
        const btnDis = buttonDisabledOrNot(error);
        dispatch(toggleDisabledButton(!btnDis));
    }, [error]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Update Password</h2>
            <FormInput
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="......"
                className={
                    error.password === null
                        ? null
                        : error.password
                        ? "error"
                        : "success"
                }
            />
            <FormInput
                type="password"
                name="newPassword"
                placeholder="......"
                value={newPassword}
                onChange={handleChange}
                className={
                    error.newPassword === null
                        ? null
                        : error.newPassword
                        ? "error"
                        : "success"
                }
            />
            <FormInput
                type="password"
                name="confirmPassword"
                placeholder="......"
                value={confirmPassword}
                onChange={handleChange}
                className={
                    error.confirmPassword === null
                        ? null
                        : error.confirmPassword
                        ? "error"
                        : "success"
                }
            />
            {isEditMode ? (
                <div className={styles.Update_password__button_group}>
                    <InputButton onClick={() => dispatch(cancleEdit())}>
                        Cancle
                    </InputButton>

                    <InputButton
                        style={{ opacity: showLoader ? 0.7 : 1 }}
                        type="submit"
                        disabled={buttonIsDisabled}
                    >
                        <span>{showLoader ? "Saveing.." : "Save"}</span>
                        {showLoader && <Loader />}
                    </InputButton>
                </div>
            ) : null}
        </form>
    );
};

export default UpdatePassword;
