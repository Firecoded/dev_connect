import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current users profile

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: err.response.data.message, status: err.response.status },
        });
    }
};