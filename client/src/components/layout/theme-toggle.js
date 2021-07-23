import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTheme } from "../../actions/theme";

const ThemeToggle = ({ theme, setTheme }) => {
    console.log("THEME", theme);
    const onClick = () => {
        setTheme(theme.themeName === "light" ? "dark" : "light");
    };
    return (
        <div onClick={onClick} className="pr-2">
            THEME TOGGLE
        </div>
    );
};

ThemeToggle.propTypes = {
    theme: PropTypes.object.isRequired,
    setTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, { setTheme })(ThemeToggle);
