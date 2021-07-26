import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTheme } from "../../actions/theme";

const ThemeToggle = ({ theme, setTheme }) => {
    const themeOnLoad = localStorage.getItem("themeOnLoad");
    const [isEnabled, setIsEnabled] = useState(themeOnLoad && themeOnLoad === "dark" ? true : false);
    useEffect(() => {
        if (themeOnLoad) {
            setTheme(themeOnLoad);
        }
    }, [setTheme]);

    const onClick = () => {
        setTheme(theme.themeName === "light" ? "dark" : "light");
        setIsEnabled(!isEnabled);
    };
    return (
        <label className="toggle-wrapper mr-2" htmlFor="toggle">
            <div className={`toggle ${isEnabled ? "enabled" : "disabled"} ${theme.primary} ${theme.themeName}`}>
                <span className="hidden">{isEnabled ? "Enable" : "Disable"}</span>
                <div className="icons">
                    <i className="fas fa-sun"></i>
                    <i className="fas fa-moon"></i>
                </div>
                <input id="toggle" name="toggle" type="checkbox" defaultChecked={isEnabled} onClick={onClick} />
            </div>
        </label>
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
