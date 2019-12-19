import React, { useContext } from "react";
import { userContext } from "../../Context/User.context";
import styles from "./Content.module.scss";

const Content = () => {
  const {
    user: { data, token },
  } = useContext(userContext);

  return (
    <div className={[styles.content, "col-8 m-auto content"].join(" ")}>
      <p className={styles.content__title}>
        {data
          ? `${data.name} Your Current Count is ${data.entries} `
          : "Your Current Count is " + 0}
      </p>
      <p className={styles.content__sub_title}>
        This Magic Brain Will Detect face in Your Picture. Get Try it.
      </p>
    </div>
  );
};
export default Content;
