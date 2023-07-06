import {authAPI, securityAPI, profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const SET_USER_IMG = 'auth/SET_USER_IMG';


let initialSate = {
    id: null,
    email: null,
    login: null,
    imgSrc: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialSate, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case SET_USER_IMG: {
            return {
                ...state,
                imgSrc: action.imgSrc,
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        }

        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
});
export const setAuthUserImg = (imgSrc) => ({
    type: SET_USER_IMG,
    imgSrc: imgSrc
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
});

export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    return data;
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        let resultPromis = dispatch(getAuthUserData());
        resultPromis.then(response => {
            let authId = response.data.id;
            profileAPI.getUserProfile(authId).then(response => {
                    dispatch(setAuthUserImg(response.photos.small))
                })
        })
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        let message = data.messages.length > 0 ? data.messages[0] : 'Something is wrong';
        let action = stopSubmit('login', {_error: message});
        dispatch(action);
    }
}
export const logout = () => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(
            setAuthUserData(null, null, null, false)
        );
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;