import React, { Fragment, useContext, useState } from "react";
import axios from "../../axios/axios";
import axiosHeader from "../../axios/helper";

import { AlertContext } from "../../Context/Alert.context";
import { userContext } from "../../Context/User.context";
import { SmartBrainContext } from "../../Context/SmartBrian.context";

import { errorLog } from "../../Reducers/SmartBrainReducers/SmartBrain.action";
import { updateBox } from "../../Reducers/SmartBrainReducers/SmartBrain.action";
import { toggleTheLoader } from "../../Reducers/FormReducers/Form.action";

import ImgInputBox from "../../Components/ImgInputBox/ImgInputBox";
import Content from "../../Components/Content/Content";
import FaceRecognition from "../../Components/FaceRecognition/FaceRecognition";

import { calculateFaceBox } from "../../Utils/calculateFaceBox";
import { runImage } from "../../Utils/Form";
import { totalCountDataLs } from "../../Utils/localStorge";

const SmartBrain = () => {
    const [count, setCount] = useState(totalCountDataLs("get") || 0);
    const {
        state: { imgUrl, error, showLoader },
        dispatch,
    } = useContext(SmartBrainContext);

    const { showAlert } = useContext(AlertContext);
    const { updateData, user } = useContext(userContext);
    const { token } = user;

    const displayFaceBox = box => {
        dispatch(updateBox(box));
    };
    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(toggleTheLoader(true));
        runImage(imgUrl, (url, status) => {
            if (status === "success") {
                dispatch(errorLog(false));
                return axios
                    .post("/detect-face", { input: imgUrl }, axiosHeader(token))
                    .then(({ data }) => {
                        dispatch(toggleTheLoader(false));
                        displayFaceBox(calculateFaceBox(data));
                        if (user.data && user.token) {
                            axios
                                .put("image-entries", {}, axiosHeader(token))
                                .then(entRes => {
                                    if (entRes.data.status === "success") {
                                        updateData(entRes.data.data);
                                    } else showAlert("something went wrong");
                                })
                                .catch(err =>
                                    showAlert(err.response.data.message),
                                );
                        } else {
                            setCount(count + 1);
                            totalCountDataLs();
                        }
                    })
                    .catch(err => {
                        showAlert("Ops.can't detect the face.");
                    });
            }
            if (status === "timeout") showAlert("image can not load. timeout!");
            if (status === "error")
                showAlert("please give valid image address");
            dispatch(errorLog(true));
        });
    };
    return (
        <Fragment>
            <Content count={count} />
            <ImgInputBox handleSubmit={onFormSubmit} />
            {/* error have three value (null || false || true) so make sure to check error === false*/}
            {error === false && !showLoader ? <FaceRecognition /> : null}
        </Fragment>
    );
};

export default React.memo(SmartBrain);
