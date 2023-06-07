import { createSelector } from "reselect"


const getUsersSelector = (state) => {
    return state.profilesData.users
}
export const getUsers = createSelector( getUsersSelector, (users) => {
    return users.filter(u => true)
})
// ********************__Для профайла__**********************
const getProfileSelector = (state) => {
    return state.profilesData.profile
}
export const getProfile = createSelector(getProfileSelector, (profile) => {
    return profile
})

const isAuthSelector = (state) => {
    return state.auth.isAuth
}
export const isAuth =  createSelector(isAuthSelector, (isAuth) => {
    return isAuth
})

const myIdSelector = (state) => {
    return state.auth.userId
}
export const myId = createSelector(myIdSelector, (userId) => {
    return userId
})


// ********************

export const getUsersOnOnePage = (state) => {
    return state.profilesData.usersOnOnePage
}

export const getUsersTotalCount = (state) => {
    return state.profilesData.usersTotalCount
}

export const getCurrentPage = (state) => {
    return state.profilesData.currentPage
}

export const getTotalPagesCount = (state) => {
    return state.profilesData.totalPagesCount
}

export const getIsFetching = (state) => {
    return state.profilesData.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.profilesData.followingInProgress
}

export const getIsAuth = (state) => {
    return state.profilesData.isAuth
}
