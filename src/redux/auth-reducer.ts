import { authAPI, profileAPI, securityAPI } from "../API/api";
import { ProfileType } from "../types/types";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_MY_PROFILE = 'SET_MY_PROFILE';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';
const SET_MESSAGE_ERROR = 'SET_MESSAGE_ERROR';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    message: null as string | null,
    authError: null as string | null,
    myProfile: null as ProfileType | null,
    captchaURL: null as string | null,
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return { ...state, ...action.payload };
        case SET_AUTH_ERROR:
            return { ...state, authError: action.error };
        case SET_MY_PROFILE:
            return { ...state, myProfile: action.myProfile };
        case SET_MESSAGE_ERROR:
            return { ...state, message: action.message };
        default:
            return state;
    }
};

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: {
        userId: number | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}

type SetAuthErrorType = {
    type: typeof SET_AUTH_ERROR
    error: string | null
}

type SetMyProfileType = {
    type: typeof SET_MY_PROFILE
    myProfile: ProfileType 
}

type GetCaptchaURLType = {
    type: typeof SET_CAPTCHA_URL
    payload: {
        captchaURL: string | null
    }  
}

type SetMessageErrorType = {
    type: typeof SET_MESSAGE_ERROR
    message: string | null
}

const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth }
});
const setAuthError = (error: string | null): SetAuthErrorType => ({ type: SET_AUTH_ERROR, error });
const setMyProfile = (profile: ProfileType): SetMyProfileType => ({ type: SET_MY_PROFILE, myProfile: profile })
const getCaptchaURL = (captchaURL: string | null): GetCaptchaURLType => ({ type: SET_CAPTCHA_URL, payload: { captchaURL } })

const setMessageError = (message: string | null): SetMessageErrorType => ({type: SET_MESSAGE_ERROR, message})

export const getMyProfile = (userId: number) => (dispatch: any) => {
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setMyProfile(response.data));
    });
};

export const auth = () => async (dispatch: any) => {
    try {
        const response = await authAPI.authMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, login, email, true));
            dispatch(getMyProfile(id)); // Вызов функции getMyProfile при авторизации
        }
        console.log(response.data);
    } catch (error: any) {
        console.log(error.message);
        dispatch(setMessageError(error.message));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
    // debugger
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(auth());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error with messages';
        dispatch(setAuthError(message));
    }
};

export const logOut = () => (dispatch: any) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export const getCaptcha = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha()
    const captchaURL = response.data.url
    dispatch(getCaptchaURL(captchaURL))
}

export default authReducer;
