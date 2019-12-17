import React from "react";

import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

import styles from "./Header.module.scss";

const Header = ({ item }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
        <Navigation item={item} />
      </div>
    </header>
  );
};
export default Header;
