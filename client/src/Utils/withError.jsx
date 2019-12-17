import React from "react";
import axios from "../axios/axios";
// import ErrorMes from "../Components/UI/ErrorMes/ErrorMes";
import Alert from "../Components/UI/AlertMessage/Alert";

export default WrapperComponent => {
  return class extends React.Component {
    state = { error: null };
    componentDidMount() {
      axios.interceptors.request.use(
        res => {
          this.setState({ error: null });
          return res;
        },
        err => this.setState({ error: err }),
      );
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        },
      );
    }
    componentDidUpdate() {
      if (this.state.error) {
        setTimeout(() => this.setState({ error: null }), 2000);
      }
    }
    render() {
      const { error } = this.state;
      return (
        <>
          {error && (
            <Alert>
              {error.response.data.message ||
                "Please Check Your Network Connection"}
            </Alert>
          )}
          <WrapperComponent {...this.props} />
          )}
        </>
      );
    }
  };
};
