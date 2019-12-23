import React, { useContext } from "react";

import { SmartBrainContext } from "../../Context/SmartBrian.context";
import { errorLog } from "../../Reducers/SmartBrainReducers/SmartBrain.action";
import { onInputChange } from "../../Reducers/FormReducers/Form.action";

import { InputButton } from "../UI/Button/Button";
import FormInput from "../Form/FormInput/FormInput";
import Loader from "../Loader/Loader";

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
        <form
            className="col-7 m-auto url-input-box"
            onSubmit={props.handleSubmit}
        >
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
