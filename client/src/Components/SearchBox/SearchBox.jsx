import React from "react";
import inputHook from "../../Hooks/inputHook";
import { InputButton } from "../UI/Button/Button";
import FormInput from "../Form/FormInput/FormInput";
import "./SearchBox.scss";

const form = props => {
  const [url, onUrlChange, resetUrl] = inputHook("");
  const handleFormSubmit = e => {
    e.preventDefault();
    props.onFormSubmit(url);
    //resetValue()
  };
  return (
    <form className="col-7 m-auto url-input-box" onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="url-input-box__input"
        value={url}
        onChange={onUrlChange}
      />
      <InputButton type="submit">Detect</InputButton>
    </form>
  );
};
export default form;
