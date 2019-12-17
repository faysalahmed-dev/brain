import React from "react";
import "./FormInput.scss";

const formInput = ({ onChange, label, ...othersProps }) => {
  return (
    <div className="input-container">
      <input onChange={onChange} {...othersProps} />
    </div>
  );
};
export default formInput;
