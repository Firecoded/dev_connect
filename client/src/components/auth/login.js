import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated, theme }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className={`large ${theme.brandText1}`}>Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className={`${theme.textWhite} px-2`}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        className={`${theme.textWhite} px-2`}
                    />
                </div>
                <input type="submit" value="Login" className={`btn ${theme.primary}`} />
            </form>
            <p className="my-1 mt-2">
                Don't have an account?{" "}
                <Link to="/register" className={`${theme.brandText1}`}>
                    Sign Up
                </Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    theme: state.theme,
});

export default connect(mapStateToProps, { login })(Login);
