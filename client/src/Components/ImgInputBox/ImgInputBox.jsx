import React, { useContext } from "react";
import { SmartBrainContext } from "../../Context/SmartBrian.context";
import { InputButton } from "../UI/Button/Button";
import FormInput from "../Form/FormInput/FormInput";
import { AlertContext } from "../../Context/Alert.context";
import { errorLog } from "../../Reducers/SmartBrainReducers/SmartBrain.action";
import Loader from "../Loader/Loader";
import {
  onInputChange,
  clearInput,
} from "../../Reducers/FormReducers/Form.action";

import "./ImgInputBox.scss";

const UrlBox = props => {
  const {
    state: { imgUrl, error, showLoader },
    dispatch,
  } = useContext(SmartBrainContext);

  const handleChange = e => {
    const { value } = e.target;
    if (error || error === false) dispatch(errorLog(null));
    dispatch(onInputChange("imgUrl", value));
  };
  return (
    <form className="col-7 m-auto url-input-box" onSubmit={props.handleSubmit}>
      <FormInput
        type="text"
        onChange={handleChange}
        value={imgUrl}
        placeholder="Enter image url"
      />
      <InputButton type="submit" disabled={imgUrl === ""}>
        <span>{showLoader ? "Detecting" : "Detect"}</span>
        {showLoader && <Loader />}
      </InputButton>
    </form>
  );
};
export default UrlBox;

// className={error.name === null ? null : error.name ? "erroror" : "success"}
