import React from "react";
import inputHook from "../../../Hooks/inputHook";

import FormInput from "../FormInput/FormInput";
import { InputButton } from "../../UI/Button/Button";
import "./SingUp.scss";

const SingUpForm = props => {
  const [userName, onUserNameChange, userNameReset] = inputHook("");
  const [password, onPasswordChange, passwordReset] = inputHook("");
  const [
    confirmPassword,
    onConfirmPasswordChange,
    confirmPasswordReset,
  ] = inputHook("");
  return (
    <div className="card alt">
      {props.children}
      <h1 className="title">
        Register
        <div className="close" onClick={props.handleToggle}></div>
      </h1>
      <form onSubmit={props.onSubmit}>
        <FormInput
          type="text"
          name="username"
          label="User Name"
          value={userName}
          onChange={onUserNameChange}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <FormInput
          type="password"
          name="repeatPassword"
          label="Repeat Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <div className="button-container">
          <InputButton type="submit">Sing Up</InputButton>
        </div>
      </form>
    </div>
  );
};
export default SingUpForm;