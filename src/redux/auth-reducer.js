import { authAPI, profileAPI, securityAPI } from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_MY_PROFILE = 'SET_MY_PROFILE';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    message: null,
    authError: null,
    myProfile: null,
    captchaURL: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return { ...state, ...action.payload };
        case SET_AUTH_ERROR:
            return { ...state, authError: action.error };
        case SET_MY_PROFILE:
            return { ...state, myProfile: action.myProfile };
        default:
            return state;
    }
};

const setAuthUserData = (userId, login, email, isAuth, message) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth, message }
});
const setAuthError = (error) => ({ type: SET_AUTH_ERROR, error });
const setMyProfile = (profile) => ({ type: SET_MY_PROFILE, myProfile: profile });
const getCaptchaURL = (captchaURL) => ({ type: SET_CAPTCHA_URL, payload: { captchaURL } })

export const getMyProfile = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setMyProfile(response.data));
    });
};

export const auth = () => async (dispatch) => {
    try {
        const response = await authAPI.authMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, login, email, true));
            dispatch(getMyProfile(id)); // Вызов функции getMyProfile при авторизации
        }
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
        dispatch(setAuthError(error.message));
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    // debugger
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(auth());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error with messages';
        dispatch(setAuthUserData(null, null, null, false, message));
    }
};

export const logOut = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaURL = response.data.url
    dispatch(getCaptchaURL(captchaURL))
}

export default authReducer;
