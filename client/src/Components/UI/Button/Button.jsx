import React from "react";
import "./Button.scss";

export const InputButton = ({ children, onClick, type, ...othersProps }) => (
    <button
        {...othersProps}
        type={type || "button"}
        onClick={onClick}
        className="form-input__button"
    >
        {children}
    </button>
);
