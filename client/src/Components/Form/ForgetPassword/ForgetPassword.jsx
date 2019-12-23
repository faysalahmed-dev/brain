import React from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios/axios";

import FormInput from "../FormInput/FormInput";
import { InputButton } from "../../UI/Button/Button";
import Loader from "../../Loader/Loader";

import { AlertContext } from "../../../Context/Alert.context";

import { testInputValue } from "../../../Utils/Form";

import styles from "../Form.module.scss";

class ForgetPassword extends React.Component {
    static contextType = AlertContext;
    state = {
        email: "",
        buttonIsDisabled: false,
        showLoader: false,
        error: null,
    };
    onSingInFormSubmit = e => {
        e.preventDefault();
        this.setState({ buttonIsDisabled: true, showLoader: true });
        const { showAlert } = this.context;
        axios
            .post("/forget-password", {
                email: this.state.email.toLowerCase().trim(),
            })
            .then(res => {
                const {
                    data: { status, message },
                } = res;
                if (status === "success") {
                    showAlert(message);
                    this.setState({ email: "" });
                } else {
                    showAlert(message);
                }
            })
            .catch(err => showAlert(err.response.data.message))
            .finally(() => {
                this.setState({ buttonIsDisabled: false, showLoader: false });
            });
    };

    handleChange = e => {
        const { value } = e.target;
        this.setState({ email: value }, () => {
            const [, isError] = testInputValue("email", value);
            this.setState({ error: isError });
        });
    };
    render() {
        const { email, buttonIsDisabled, showLoader, error } = this.state;
        return (
            <React.Fragment>
                <form
                    onSubmit={this.onSingInFormSubmit}
                    className={styles.form}
                >
                    <h2>Forget Password</h2>
                    <FormInput
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="username@example.com"
                        className={
                            error === null ? null : error ? "error" : "success"
                        }
                    />
                    <InputButton type="submit" disabled={buttonIsDisabled}>
                        <span>Submit</span>
                        {showLoader ? <Loader /> : null}
                    </InputButton>
                    <div className={styles.form__footer}>
                        <Link to="/auth/singin">sing into your account</Link>
                        <br />
                        <Link to="/auth/register">create new account</Link>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default ForgetPassword;
