import { SET_THEME } from "./types";

export const THEMES = {
    dark: {
        primary: "deep-purple darken-1",
        primaryVariant: "indigo darken-3",
        secondary: "teal accent-2",
        secondaryVariant: "teal accent-2",
        background1: "grey darken-4",
        background2: "blue-grey darken-4",
        background3: "grey darken-3",
        danger: "red lighten-1",
        success: "green darken-3",
        info: "blue lighten-2",
        textBlack: "black-text",
        textWhite: "white-text",
        text1: "",
        text2: "",
        text3: "",
        themeName: "dark",
        brandText2: "teal-text text-accent-2",
        brandText1: "deep-purple-text text-accent-1",
    },
    light: {
        primary: "",
        primaryVariant: "",
        secondary: "",
        secondaryVariant: "",
        background1: "white",
        background2: "",
        background3: "",
        danger: "",
        success: "",
        info: "",
        textBlack: "white-text",
        textWhite: "black-text",
        text1: "",
        text2: "",
        text3: "",
        themeName: "light",
        brandText2: "teal-text text-darken-2",
        brandText1: "deep-purple-text text-darken-1",
    },
};

export const setTheme = (themeName) => (dispatch) => {
    const themeData = THEMES[themeName];
    localStorage.setItem("themeOnLoad", themeName);
    document.body.className = "";
    themeData.background1.split(" ").map((c) => {
        if (c) {
            document.body.classList.add(c);
        }
    });
    dispatch({
        type: SET_THEME,
        payload: { ...themeData },
    });
};
