import React, { useContext, useState } from "react";
import { userContext } from "../../Context/User.context";
import styles from "./Content.module.scss";

const Content = props => {
    const {
        user: { data },
    } = useContext(userContext);

    return (
        <div className={[styles.content, "col-8 m-auto content"].join(" ")}>
            <p className={styles.content__title}>
                {data
                    ? `${data.name.split(" ")[0]} Your Current Count is ${
                          data.entries
                      } `
                    : `Your Current Count is ${props.count || 0}`}
            </p>
            <p className={styles.content__sub_title}>
                This Magic Brain Will Detect face in Your Picture. Get Try it.
            </p>
        </div>
    );
};
export default Content;
