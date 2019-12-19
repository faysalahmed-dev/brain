import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { userContext } from "../../Context/User.context";
import Auth from "../../Containers/Auth/Auth";
import Header from "../../Components/Header/Header";
import AlertBox from "../../Components/UI/AlertMessage/Alert";
import { AlertContext } from "../../Context/Alert.context";

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
    <div className={styles.auth_page}>
      {isShowAlert && <AlertBox>{message}</AlertBox>}
      <Header item={["Home/", "Sing in", "Register"]} />
      <main className={styles.auth_page__form}>
        <Auth />
      </main>
    </div>
  );
};
export default AuthPage;
