import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import WithErrorHandler from "../../Utils/withError";
import SingIn from "../../Components/Form/SingIn/SingIn";
import Register from "../../Components/Form/Register/Register";

import styles from "./Auth.module.scss";

function auth(props) {
  return (
    <div className={styles.form__container}>
      <Route path="/auth/singin" exact component={SingIn} />
      <Route path="/auth/register" exact component={Register} />
      {props.location.pathname === "/auth" && <Redirect to="/auth/login" />}
    </div>
  );
}
export default WithErrorHandler(withRouter(auth));
