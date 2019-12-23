import React from "react";

import styles from "./PageLoader.module.scss";

function PageLoader() {
    return (
        <div className={styles.page_loader}>
            <div className={styles.loader}></div>
            <div className={styles.loading}>Loading...</div>
        </div>
    );
}
export default PageLoader;
