import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/UI/Layout/Layout";
import { AlertContext } from "../../Context/Alert.context";
import AlertBox from "../../Components/UI/AlertMessage/Alert";

import styles from "./PageNotFound.module.sass";

const PageNotFound = () => {
    const {
        alert: { isShowAlert, message },
    } = useContext(AlertContext);
    return (
        <Layout navItem={[]}>
            <main className={styles.page_not_found}>
                {isShowAlert && <AlertBox>{message}</AlertBox>}
                <div>
                    <h1>404</h1>
                    <h2>Ops. Look like you've lost</h2>
                    <Link to="/">Go To Home</Link>
                </div>
            </main>
        </Layout>
    );
};

export default PageNotFound;
