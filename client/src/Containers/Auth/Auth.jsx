import React from "react";
import { withRouter } from "react-router-dom";
import Login from "../../Components/Form/Login/Login";

function auth(props) {
  const onFormSubmit = e => {
    e.preventDefault();
    props.history.replace("/");
  };
  return (
    <div>
      <Login onSubmit={onFormSubmit} />
    </div>
  );
}
export default withRouter(auth);
