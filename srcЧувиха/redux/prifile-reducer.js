import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {setAuthUserImg} from "./auth-reducer";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const UPDATE_USER_STATUS = 'profile/UPDATE_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialSate = {
    postsData: [
        {
            id: 1,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elite. Under dicta mode maxime, hic ' +
                'cuppa debits, place quake Cheque autumn liquid incident! Eum labour aliquot aerial?',
            imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
            valueLike: 12,
        },
        {
            id: 2,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elite. Under dicta mode maxime, hic ' +
                'cuppa debits, place quake Cheque autumn liquid incident! Eum labour aliquot aerial?',
            imgSrc: 'https://i.pinimg.com/564x/3c/e6/25/3ce625ab130460755d1475fb033652f2.jpg',
            valueLike: 39,
        },
    ],
    profileInfo: null,
    status: ' ',
}

const profileReducer = (state = initialSate, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {
                    id: 3,
                    message: action.newPost,
                    imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
                    valueLike: 0,
                }],
            };
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId),
            };
        case  SET_USER_PROFILE:
            return {
                ...state,
                profileInfo: action.profileInfo,
            };
        case  SET_USER_STATUS:
            return {
                ...state,
                status: action.statusText,
            };
        case  UPDATE_USER_STATUS:
            return {
                ...state,
                status: action.statusText,
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profileInfo: {...state.profileInfo, photos: action.photos}
            };

        default:
            return state;
    }

}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost: newPost});
export const setUserProfile = (profileInfo) => ({type: SET_USER_PROFILE, profileInfo});
export const setUserStatus = (statusText) => ({type: SET_USER_STATUS, statusText: statusText});
export const setUpdateUserStatus = (statusText) => ({type: UPDATE_USER_STATUS, statusText: statusText});
export const deletePost = (postId) => ({type: DELETE_POST, postId: postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getUserProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}
export const getUserStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(data));
}
export const updateUserStatus = (statusText) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(statusText);
        if (data.resultCode === 0) {
            dispatch(setUpdateUserStatus(statusText));
        }
    } catch (error) {
    }

}
export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
        dispatch(setAuthUserImg(data.data.photos.small))
    }
}
export const saveUserData = (formData) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveUserData(formData);

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        // dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": data.messages[0]}}));
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;