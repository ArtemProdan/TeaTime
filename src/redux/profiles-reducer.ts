import { usersAPI, profileAPI } from "../API/api"
import { PhotosType, ProfileType, UserType } from "../types/types"

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
    users: [] as Array<UserType>,
    myFriends: [] as Array<UserType>,
    profile: null as ProfileType | null,
    usersOnOnePage: 11, //количестов пользователей на одной странице
    usersTotalCount: null, //получаем из response
    totalPagesCount: null, //подсчитываем
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    status: ''
}


const profilesReducer = (state = initialState, action: any) => {
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


        default: return state
    }
}

type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}

type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

type SetMyFriendsActionType = {
    type: typeof MY_FRIENDS
    myFriends: Array<UserType>
}

type SetPageActionType = {
    type: typeof SET_PAGE
    currentPage: number
}

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

type SetTotalPagesCountActionType = {
    type: typeof SET_TOTAL_PAGES_COUNT
    pages: number
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCES
    photos: PhotosType
}

const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId })
const unfollow = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
//  const setMyFriends = (myFriends: Array<UserType>): SetMyFriendsActionType  => ({ type: MY_FRIENDS, myFriends })
const setPage = (currentPage: number): SetPageActionType => ({ type: SET_PAGE, currentPage })
const setUsersTotalCount = (count: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count })
//  const setTotalPagesCount = (pages: number): SetTotalPagesCountActionType => ({ type: SET_TOTAL_PAGES_COUNT, pages })
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
const savePhotoSucces = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCES, photos })


export const getUsersThunk = (currentPage: number, usersOnOnePage: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setPage(currentPage))

        let data = await usersAPI.getUsers(currentPage, usersOnOnePage)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }
}

export const unfollowThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollow(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const followThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) { dispatch(follow(userId)) }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const getUserProfileThunk = (userId: number) => (dispatch: any) => {
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
        console.log(response.data)
    })
}

export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunk(userId))
    } else {
        return response.data.messages
    }
}


export default profilesReducer






