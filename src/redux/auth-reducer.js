import { authAPI } from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    message: null,
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };
        case SET_AUTH_ERROR: // Добавление обработки SET_AUTH_ERROR
            return { ...state, authError: action.error }

        default: return state;
    }
};

export const setAuthUserData = (userId, login, email, isAuth, message) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth, message }
});

const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    error
});

export const auth = () => async (dispatch) => {
    try {
        const response = await authAPI.authMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
        console.log(response.data);
    } 
    catch (error) {
        console.log(error.message);
        dispatch(setAuthError(error.message)); // Установка ошибки аутентификации
    }
};


// export const auth = () => (dispatch) => {
//     return authAPI.authMe()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 let { id, login, email } = response.data.data;
//                 dispatch(setAuthUserData(id, login, email, true));
//             }
//             console.log(response.data);
//         });
// };

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(auth());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error with messages';
                dispatch(setAuthUserData(null, null, null, false, message));
            }
        });
};

export const logOut = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};

export default authReducer;
