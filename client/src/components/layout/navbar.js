import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import ThemeToggle from "./theme-toggle";

const Navbar = ({ auth: { isAuthenticated }, theme, logout }) => {
    const authLinks = (
        <ul className="d-flex align-items-center">
            <li>
                <Link to="/profiles" className="p-0 pr-3">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/posts" className="p-0 pr-3">
                    Posts
                </Link>
            </li>
            <li>
                <Link to="/dashboard" className="d-flex align-items-center p-0 pr-3">
                    <i className="fas fa-user valign-wrapper mr-1" /> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!" className="d-flex align-items-center p-0 pr-1">
                    <i className="fas fa-sign-out-alt valign-wrapper mr-1" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="d-flex align-items-center">
            <li>
                <Link to="/profiles" className="p-0 pr-3">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/register" className="p-0 pr-3">
                    Register
                </Link>
            </li>
            <li>
                <Link to="/login" className="p-0 pr-1">
                    Login
                </Link>
            </li>
        </ul>
    );

    return (
        <Fragment>
            <nav className={`navbar ${theme.background1} ${theme.textWhite}`}>
                <Link to="/" className="d-flex align-items-center">
                    <h4 className="d-flex align-items-center valign-wrapper p-0 m-0">
                        <span className={`${theme.brandText1}`}>{`<`}</span>
                        <span className={`${theme.brandText1}`}>Dev</span>
                        <span className={`${theme.brandText2}`}>Hub</span>
                        <span className={`${theme.brandText1}`}>{`/>`}</span>
                    </h4>
                </Link>
                <span className="d-flex align-items-center">
                    <ThemeToggle />
                    {isAuthenticated ? authLinks : guestLinks}
                </span>
                <Fragment></Fragment>
            </nav>
            <div className="fixed-spacer"></div>
        </Fragment>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    theme: state.theme,
});

export default connect(mapStateToProps, { logout })(Navbar);
