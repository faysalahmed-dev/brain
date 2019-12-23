import React, { useReducer, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {
    registerFormReducer,
    registerInitialState,
} from "../../../Reducers/RegisterFormReducers/RegisterForm.reducer";
import FormInput from "../FormInput/FormInput";
import { InputButton } from "../../UI/Button/Button";
import axios from "../../../axios/axios";
import Loader from "../../Loader/Loader";
import { AlertContext } from "../../../Context/Alert.context";
import {
    toggleDisabledButton,
    toggleTheLoader,
    onInputChange,
    errorLog,
    clearInput,
} from "../../../Reducers/FormReducers/Form.action";
import { testInputValue, buttonDisabledOrNot } from "../../../Utils/Form";
import { userContext } from "../../../Context/User.context";

import styles from "../Form.module.scss";

const RegisterForm = props => {
    const [state, dispatch] = useReducer(
        registerFormReducer,
        registerInitialState,
    );
    const {
        name,
        email,
        password,
        confirmPassword,
        buttonIsDisabled,
        showLoader,
        error,
    } = state;

    const { showAlert } = useContext(AlertContext);
    const { setUserData } = useContext(userContext);

    useEffect(() => {
        const btnDis = buttonDisabledOrNot(error);
        dispatch(toggleDisabledButton(!btnDis));
    }, [error]);

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch(onInputChange(name, value));
        const [fieldName, isError] = testInputValue(name, value, password);
        dispatch(errorLog(fieldName, isError));
    };

    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(toggleTheLoader(true));
        dispatch(toggleDisabledButton(true));

        const buildData = {
            email: email.toLowerCase().trim(),
            name: name.trim(),
            password: password.trim(),
        };

        axios
            .post("/register", buildData)
            .then(res => {
                dispatch(toggleTheLoader(false));
                const {
                    data: { data, status, token, message },
                } = res;
                if (status === "success") {
                    // show alert with message
                    showAlert("Account created..");
                    //update the state as well as save user data in local storage
                    setUserData(data, token);
                    // reseting all the input
                    dispatch(clearInput());
                    // redirect to home page
                    setTimeout(() => props.history.replace("/"), 500);
                } else {
                    showAlert(message);
                }
            })
            .catch(err => showAlert(err.response.data.message))
            .finally(() => {
                dispatch(toggleTheLoader(false));
                setTimeout(() => showAlert(false), 500);
            });
    };

    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <h2>Register</h2>
            <FormInput
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Jhon Deo"
                className={
                    error.name === null
                        ? null
                        : error.name
                        ? "erroror"
                        : "success"
                }
            />
            <FormInput
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="username@example.com"
                className={
                    error.email === null
                        ? null
                        : error.email
                        ? "error"
                        : "success"
                }
            />
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
            <InputButton disabled={buttonIsDisabled} type="submit">
                <span>Register</span>
                {showLoader ? <Loader /> : null}
            </InputButton>
            <div className={styles.form__footer}>
                <Link to="/auth/singin">I already have an account</Link>
            </div>
        </form>
    );
};
export default withRouter(RegisterForm);
