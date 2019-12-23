import React, { useState, useContext, useEffect } from "react";
//import axios from "../axios/axios";
import axios from "axios";
// import ErrorMes from "../Components/UI/ErrorMes/ErrorMes";
import { AlertContext } from "../../Context/Alert.context";
import Alert from "../../Components/UI/AlertMessage/Alert";

export default WrapperComponent => {
    return props => {
        const [error, setError] = useState(null);
        const { alert, showAlert } = useContext(AlertContext);
        useEffect(() => {
            axios.interceptors.request.use(
                res => {
                    //console.log("request res=>", res);
                    setError(null);
                    return res;
                },
                err => {
                    //console.log("request err =>", err);
                    setError(err);
                },
            );
            axios.interceptors.response.use(
                res => {
                    //console.log("response =>", res);
                    return res;
                },
                err => {
                    console.log("response error=>", err.response.data.message);
                    setError(err.response.data);
                    console.log("response error=>", err.response.data.message);
                    console.log(error);
                },
            );
        }, []);
        // useEffect(() => {
        //     // const abortController = new AbortController();
        //     // const single = abortController.signal;
        //     const timeout = setTimeout(() => setError(null), 2000);
        //     return () => clearTimeout(timeout);
        // }, [error]);
        //console.log("context=>", this.context);
        //if (error) setTimeout(() => setError(null), 2000);
        console.log("state error=>", error);
        return (
            <>
                {error && (
                    <Alert>
                        {error || "Please Check Your Network Connection"}
                    </Alert>
                )}
                <WrapperComponent {...props} />
            </>
        );
    };
};
