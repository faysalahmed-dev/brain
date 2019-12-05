import React from "react";
import "./Button.scss";

export const InputButton = ({ children, ...othersProps }) => (
  <button {...othersProps} className="form-input__button">
    {children}
  </button>
);
