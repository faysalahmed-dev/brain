import React from "react";

import styles from "./Alert.module.scss";

const alert = ({ children }) => {
  return (
    <div className={styles.alert}>
      <p className={styles.message}>{children || ""}</p>
    </div>
  );
};
export default alert;
