import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export const NavBar = connect(mapStateToProps, { logout })(({ auth: { isAuthenticated, loading }, logout }) => {
    const buildLinks = () => {
        if (loading) {
            return <Fragment />;
        }
        if (isAuthenticated) {
            return (
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <a onClick={logout} href="#!">
                            <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to="/">Developers</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnect
                </Link>
            </h1>
            {buildLinks()}
        </nav>
    );
});

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
