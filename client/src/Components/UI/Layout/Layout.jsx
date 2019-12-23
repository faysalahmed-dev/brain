import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { userContext } from "../../../Context/User.context";
import Header from "../../Header/Header";
import buildPath from "../../../Utils/buildPath";
import styles from "./Layout.module.scss";

const path = ["Home/", "Sing In/auth/singin", "Register/auth/register"];

const Layout = props => {
    const {
        user: { data, token },
    } = useContext(userContext);
    const { pathname } = props.location;
    const withOutUser = path.filter(el => pathname !== buildPath(el)[0]);
    return (
        <div className={styles.layout}>
            <Header item={data && token ? props.navItem : withOutUser} />
            {props.children}
        </div>
    );
};
export default React.memo(withRouter(Layout));
