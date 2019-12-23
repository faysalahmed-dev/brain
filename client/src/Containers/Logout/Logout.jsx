import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { userContext } from "../../Context/User.context";

const Logout = props => {
    const { removeUserData } = useContext(userContext);
    useEffect(() => {
        removeUserData();
        props.history.replace("/");
    }, []);
    return <Redirect to="/" />;
};
export default Logout;
