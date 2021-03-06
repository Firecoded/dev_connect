import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    theme: state.theme,
});

export const Landing = connect(mapStateToProps)(({ isAuthenticated, theme }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <section className={`landing ${theme.background1} ${theme.textWhite}`}>
            <div className="landing-inner">
                <h1 className="">Hub for Developers</h1>
                <p className="lead mb-5">
                    Create a developer profile/portfolio, share posts and get help from other developers
                </p>
                <div className="buttons">
                    <Link to="/register" className={`btn btn-large mr-4 ${theme.primary}`}>
                        Sign Up
                    </Link>
                    <Link to="/login" className={`btn btn-large ${theme.primaryVariant}`}>
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
});

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    theme: PropTypes.object.isRequired,
};
