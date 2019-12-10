import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../Components/Form/Login/Login";

function auth(props) {
  return (
    <div>
      <Login />
    </div>
  );
}
export default withRouter(auth);
