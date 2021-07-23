import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTheme } from "../../actions/theme";

const ThemeToggle = ({ theme, setTheme }) => {
    console.log("THEME", theme);
    const onClick = () => {
        setTheme(theme.themeName === "light" ? "dark" : "light");
    };
    return <div onClick={onClick}>THEME TOGGLE</div>;
};

ThemeToggle.propTypes = {
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setTheme: PropTypes.func.isRequired,
    theme: state.theme,
});

export default connect(mapStateToProps, { setTheme })(ThemeToggle);
