import React from "react";
import Auth from "../../Containers/Auth/Auth";
import Header from "../../Components/Header/Header";

import styles from "./AuthPage.module.scss";

const authPage = props => (
  <div className={styles.auth_page}>
    <Header item={["Home/", "Sing in", "Register"]} />
    <main className={styles.auth_page__form}>
      <Auth />
    </main>
  </div>
);
export default authPage;
