import { THEMES } from "../actions/theme";
import { SET_THEME } from "../actions/types";

const initialState = THEMES.dark;

function themeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_THEME:
            return payload;
        default:
            return state;
    }
}

export default themeReducer;
