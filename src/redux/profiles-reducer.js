import { usersAPI, profileAPI } from "../API/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const MY_FRIENDS = 'MY-FRIENDS'
const SET_PAGE = 'SET-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const SET_TOTAL_PAGES_COUNT = 'SET_TOTAL_PAGES_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES'

let initialState = {
    users: [],
    myFriends: [],
    profile: '',
    usersOnOnePage: 11, //количестов пользователей на одной странице
    usersTotalCount: null, //получаем из response
    totalPagesCount: null, //подсчитываем
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    status: ''
}


const profilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case MY_FRIENDS: {
            return { ...state, myFriends: action.myFriends }
        }

        case SET_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, usersTotalCount: action.count }
        }
        case SET_TOTAL_PAGES_COUNT: {
            return { ...state, totalPagesCount: action.pages }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        case SET_STATUS: {
            return { ...state, status: action.status }
        }

        case SAVE_PHOTO_SUCCES: {
            // debugger
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }


        default: return state;
    }
}

export const follow = (userId) => ({ type: FOLLOW, userId })
export const unfollow = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setMyFriends = (myFriends) => ({ type: MY_FRIENDS, myFriends })
export const setPage = (currentPage) => ({ type: SET_PAGE, currentPage })
export const setUsersTotalCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count })
export const setTotalPagesCount = (pages) => ({ type: SET_TOTAL_PAGES_COUNT, pages })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos })


export const getUsersThunk = (currentPage, usersOnOnePage) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setPage(currentPage))

        let data = await usersAPI.getUsers(currentPage, usersOnOnePage)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}

export const unfollowThunk = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollow(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followThunk = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) { dispatch(follow(userId)) }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const getUserProfileThunk = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
        console.log(response.data);
    })
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunk(userId))
        console.log(response)
    } else {
        
    }
}

export default profilesReducer






