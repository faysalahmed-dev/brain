import React, { useEffect, useContext, useReducer } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  formReducer,
  initialState,
} from "../../../Reducers/SinginFormReducers/SinginForm.reducer";
import axios from "../../../axios/axios";
import FormInput from "../FormInput/FormInput";
import { InputButton } from "../../UI/Button/Button";
import Loader from "../../Loader/Loader";
import { AlertContext } from "../../../Context/Alert.context";
import { userContext } from "../../../Context/User.context";

import {
  toggleDisabledButton,
  toggleTheLoader,
  onInputChange,
  errorLog,
  clearInput,
} from "../../../Reducers/FormReducers/Form.action";
import { testInputValue } from "../../../Utils/Form";

import styles from "../Form.module.scss";

const SingIn = props => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, password, buttonIsDisabled, showLoader, error } = state;

  const { showAlert } = useContext(AlertContext);
  const { setUserData } = useContext(userContext);
  useEffect(() => {
    const formError = Object.values(error).every(err => err === false);
    if (formError) dispatch(toggleDisabledButton(false));
    else dispatch(toggleDisabledButton(true));
  }, [error]);

  const onSingInFormSubmit = e => {
    e.preventDefault();
    dispatch(toggleTheLoader(true));
    dispatch(toggleDisabledButton(true));
    const buildData = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
    };
    axios
      .post("/singin", buildData)
      .then(res => {
        if (!res) return;
        //stop button loader
        dispatch(toggleTheLoader(false));
        const {
          data: { data, status, token, message },
        } = res;
        if (status === "success") {
          // show alert with message
          showAlert("Logged in...");
          // updating the state as well as save user data to local stroage
          setUserData(data, token);
          // reseting all the input
          dispatch(clearInput());
          // redirect to home page
          setTimeout(() => props.history.replace("/"), 500);
        } else {
          showAlert(message);
        }
      })
      .finally(() => {
        dispatch(toggleTheLoader(false));
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(onInputChange(name, value));
    const [fieldName, isError] = testInputValue(name, value, password);
    dispatch(errorLog(fieldName, isError));
  };

  return (
    <React.Fragment>
      <form onSubmit={onSingInFormSubmit} className={styles.form}>
        <h2>Sing In</h2>
        <FormInput
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="username@example.com"
          className={
            error.email === null ? null : error.email ? "error" : "success"
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
        <InputButton type="submit" disabled={buttonIsDisabled}>
          <span>Log In</span>
          {showLoader ? <Loader /> : null}
        </InputButton>
        <div className={styles.form__footer}>
          <Link to="/auth/register">I don't have an account</Link>
          <Link to="/">Forgot your password?</Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default withRouter(SingIn);
