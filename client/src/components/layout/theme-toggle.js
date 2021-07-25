import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTheme } from "../../actions/theme";

const ThemeToggle = ({ theme, setTheme }) => {
    const themeOnLoad = localStorage.getItem("themeOnLoad");
    const [isEnabled, setIsEnabled] = useState(themeOnLoad && themeOnLoad === "dark" ? true : false);
    console.log("THEME", theme);
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
        <label className="toggle-wrapper pr-2" htmlFor="toggle">
            <div className={`toggle ${isEnabled ? "enabled" : "disabled"} ${theme.primary} ${theme.themeName}`}>
                <span className="hidden">{isEnabled ? "Enable" : "Disable"}</span>
                <div className="icons">
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                </div>
                <input id="toggle" name="toggle" type="checkbox" checked={isEnabled} onClick={onClick} />
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
