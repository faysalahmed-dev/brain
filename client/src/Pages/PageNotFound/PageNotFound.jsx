import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { userContext } from "../../Context/User.context";
import { AlertContext } from "../../Context/Alert.context";
import AlertBox from "../../Components/UI/AlertMessage/Alert";

import styles from "./PageNotFound.module.sass";

const PageNotFound = () => {
  const {
    user: { data, token },
  } = useContext(userContext);
  const {
    alert: { isShowAlert, message },
  } = useContext(AlertContext);
  const withOutUser = [
    "Home/",
    "Sing in/auth/singin",
    "Register/auth/register",
  ];
  const withUser = ["profile", "logout"];
  return (
    <div className={styles.page_not_found}>
      {isShowAlert && <AlertBox>{message}</AlertBox>}
      <Header item={data && token ? withUser : withOutUser} />
      <main>
        <div>
          <h1>404</h1>
          <h2>Ops. Look like you've lost</h2>
          <Link to="/">Go To Home</Link>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
