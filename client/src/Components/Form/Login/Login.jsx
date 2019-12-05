import React, { useState } from "react";
import inputHook from "../../../Hooks/inputHook";

import FormInput from "../FormInput/FormInput";
import { InputButton } from "../../UI/Button/Button";
import SingUpForm from "../SingUp/SingUp";
import { ReactComponent as User } from "../../../Assets/user-plus.svg";
import "./Login.scss";

const Login = props => {
  const [toggle, setToggle] = useState(false);
  const [userName, onUserNameChange, userNameReset] = inputHook("");
  const [password, onPasswordChange, passwordReset] = inputHook("");

  const handleToggle = () => setToggle(!toggle);
  return (
    <React.Fragment>
      <div className={toggle ? "form__container active" : "form__container"}>
        <div className="card"></div>
        <div className="card">
          <h1 className="title">Login</h1>
          <form onSubmit={props.onSubmit} autoComplete="off">
            <FormInput
              type="text"
              name="username"
              value={userName}
              label="User Name"
              onChange={onUserNameChange}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={onPasswordChange}
            />
            <div className="button-container">
              <InputButton type="submit">LogIn</InputButton>
            </div>
            <div className="footer">
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </div>
        <SingUpForm handleToggle={handleToggle} onSubmit={props.onSubmit}>
          <div className="toggle" onClick={handleToggle}>
            {/* <User /> */}
          </div>
        </SingUpForm>
      </div>
    </React.Fragment>
  );
};

export default Login;
