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
                <Link to="/profiles" className="p-0 px-2">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/posts" className="p-0 pr-2">
                    Posts
                </Link>
            </li>
            <li>
                <Link to="/dashboard" className="d-flex align-items-center p-0 px-2 hide-sm">
                    <i className="fas fa-user valign-wrapper mr-1" /> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!" className="d-flex align-items-center p-0 px-2">
                    <i className="fas fa-sign-out-alt valign-wrapper mr-1" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="d-flex align-items-center">
            <li>
                <Link to="/profiles" className="p-0 px-2">
                    Developers
                </Link>
            </li>
            <li>
                <Link to="/register" className="p-0 px-2">
                    Register
                </Link>
            </li>
            <li>
                <Link to="/login" className="p-0 px-2 pr-1">
                    Login
                </Link>
            </li>
        </ul>
    );

    const logo = () => {
        return (
            <Fragment>
                <h4 className="p-0 px-2 m-0 hide-sm logo">
                    <span className={`${theme.brandText1}`}>{`<`}</span>
                    <span className={`${theme.brandText1}`}>Dev</span>
                    <span className={`${theme.brandText2}`}>Hub</span>
                    <span className={`${theme.brandText1}`}>{`/>`}</span>
                </h4>
                <h4 className="p-0 pl-2 m-0 pl-4 show-sm left logo">
                    <span className={`${theme.brandText1}`}>D</span>
                    <span className={`${theme.brandText2}`}>H</span>
                </h4>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <nav className={`navbar ${theme.background2} ${theme.textWhite}`}>
                <Link to="/" className="">
                    {logo()}
                </Link>
                <span className="d-flex align-items-center right">
                    <ThemeToggle />
                    {isAuthenticated ? authLinks : guestLinks}
                </span>
                <Fragment></Fragment>
            </nav>
            <div className={`fixed-spacer ${theme.background1}`}></div>
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
