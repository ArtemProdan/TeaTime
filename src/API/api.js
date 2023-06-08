import axios from "axios"
import avatar from '../components/Gallery/Gallery_pics/1.jpg'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    // headers: { 'API-KEY': '54398fa5-7a70-4d56-b172-361948f7ccb0' },
    headers: { 'API-KEY': '5dac72e7-95e4-45f1-9e1b-e055e4330068' },
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

    // authMe() {
    //     return (instance.get(`auth/me`, {})
    //     )
    // },

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

    photo() {
        return instance.put(`/profile/photo`, { photo: { large : {avatar}, small : {avatar} } })
        // .then( alert('Отработало фото api') )
    },
}

export const authAPI = {
    authMe() { return (instance.get(`auth/me`, {})) },

    login(email, password, rememberMe = true) {
        return instance.post(`auth/login`, { email, password, rememberMe})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}
// socialnetworksamuraijs1234567890