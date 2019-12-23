import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AlertContext } from "../../Context/Alert.context";
import { userContext } from "../../Context/User.context";
import AlertBox from "../../Components/UI/AlertMessage/Alert";
import Layout from "../../Components/UI/Layout/Layout";
import UpdateInfo from "../../Components/Form/UpdateInfo/UpdateInfo";
import UpdatePassword from "../../Components/Form/UpdatePassword/UpdatePassword";
import styles from "./Profile.module.scss";
const HomePage = () => {
    const {
        alert: { isShowAlert, message },
    } = useContext(AlertContext);
    const {user:{data,token}} = useContext(userContext);
    if (!data || !token) return <Redirect to="/" />;
    return (
        <Layout navItem={["Home/", "Logout/logout"]}>
            <main>
                {isShowAlert && <AlertBox>{message}</AlertBox>}
                <div className={[styles.profile_page, "container"].join(" ")}>
                    <UpdateInfo />
                    <UpdatePassword />
                </div>
            </main>
        </Layout>
    );
};

export default HomePage;
