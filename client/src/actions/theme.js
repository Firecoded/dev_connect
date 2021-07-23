import { SET_THEME } from "./types";

export const THEMES = {
    dark: {
        primary: "deep-purple accent-1",
        primaryVariant: "indigo darken-3",
        secondary: "teal accent-2",
        secondaryVariant: "teal accent-2",
        background1: "grey darken-4",
        background2: "blue-grey darken-4",
        background3: "grey darken-3",
        danger: "red lighten-2",
        success: "green accent-3",
        info: "blue lighten-2",
        textBlack: "black-text",
        textWhite: "grey-text text-lighten-5",
        text1: "",
        text2: "",
        text3: "",
        themeName: "dark",
    },
    light: {
        primary: "",
        primaryVariant: "",
        secondary: "",
        secondaryVariant: "",
        background1: "",
        background2: "",
        background3: "",
        danger: "",
        success: "",
        info: "",
        text1: "",
        text2: "",
        text3: "",
        themeName: "light",
    },
};

export const setTheme = (themeName) => (dispatch) => {
    const themeData = THEMES[themeName];
    dispatch({
        type: SET_THEME,
        payload: { ...themeData },
    });
};
