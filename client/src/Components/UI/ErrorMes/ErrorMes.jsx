import React from "react";

import styles from "./ErrorMes.module.scss";

const errorMes = props => {
  return (
    <p className={styles.error_mes}>
      {props.mes || "Please Check Your Network Connection"}
    </p>
  );
};
export default errorMes;
