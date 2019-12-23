import React, { useContext } from "react";
import { Redirect, withRouter, Route } from "react-router-dom";

import { userContext } from "../../Context/User.context";
import { AlertContext } from "../../Context/Alert.context";

import SingIn from "../../Components/Form/SingIn/SingIn";
import Register from "../../Components/Form/Register/Register";
import ForgetPassword from "../../Components/Form/ForgetPassword/ForgetPassword";
import Layout from "../../Components/UI/Layout/Layout";
import AlertBox from "../../Components/UI/AlertMessage/Alert";

import styles from "./AuthPage.module.scss";

const AuthPage = props => {
    const {
        user: { data, token },
    } = useContext(userContext);
    const {
        alert: { isShowAlert, message },
    } = useContext(AlertContext);

    if (data && token) return <Redirect to="/" />;

    return (
        <Layout>
            <main className={styles.auth_page__form}>
                {isShowAlert && <AlertBox>{message}</AlertBox>}
                <div className={styles.auth_page__form_container}>
                    <Route path="/auth/singin" exact component={SingIn} />
                    <Route path="/auth/register" exact component={Register} />
                    <Route
                        path="/auth/forget-password"
                        exact
                        component={ForgetPassword}
                    />
                    {props.location.pathname === "/auth" && (
                        <Redirect to="/auth/singin" />
                    )}
                </div>
            </main>
        </Layout>
    );
};
export default React.memo(withRouter(AuthPage));
