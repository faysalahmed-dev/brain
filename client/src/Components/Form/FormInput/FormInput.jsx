import React from "react";
import "./FormInput.scss";

const formInput = props => {
  const { type, name, onChange, value, label } = props;
  const cls = "label-transform";
  return (
    <div className="input-container">
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
      <label htmlFor={name} className={value.length > 0 ? cls : null}>
        {label}
      </label>
      <div className="bar"></div>
    </div>
  );
};
export default formInput;
