import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    // headers: { 'API-KEY': '54398fa5-7a70-4d56-b172-361948f7ccb0' },
    // headers: { 'API-KEY': '5dac72e7-95e4-45f1-9e1b-e055e4330068' },
    headers: { 'API-KEY': 'a1cf4e99-d380-4e08-a364-09bbcfdfd7fa' },
    email: 'maxivanov312@gmail.com',
    password: 'socialnetworksamuraijs1234567890',
})

export const usersAPI = {
    getUsers(currentPage = 1, usersOnOnePage = 13) {
        return instance.get(`users?count=${usersOnOnePage}&page=${currentPage}&term=${''}&friend=omit`)
            .then(response => {
                return response.data;
            });
    },

    getMyFriends(currentPage = 1, usersOnOnePage = 100) {
        return instance.get(`users?count=${usersOnOnePage}&page=${currentPage}&term=${''}&friend=true`)
            .then(response => { return response.data; }
            )
    },

    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => { return response.data })
    },

    followUser(id) {
        return instance.post(`/follow/${id}`)
            .then(response => { return response.data })
    },
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId)
    },

    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
    },

    updateStatus(status) {
        return instance.put(`/profile/status`, { status: status })
    },

    savePhoto(photo) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    },

    saveProfile(profile) {
        return instance.put(`/profile`, profile)
    }
}

export const authAPI = {
    authMe() { return (instance.get(`auth/me`, {})) },

    login(email, password, rememberMe = true, captcha = null) { return instance.post(`auth/login`, { email, password, rememberMe, captcha }) },

    logOut() { return instance.delete(`auth/login`) },
}

export const securityAPI = {
    getCaptcha() { return (instance.get(`security/get-captcha-url`)) }
}
// socialnetworksamuraijs1234567890