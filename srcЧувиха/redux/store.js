import profileReducer from "./prifile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export let store = {
    _state: {
        profilePage: {
            postsData: [
                {
                    id: 1,
                    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dicta modi maxime, hic ' +
                        'culpa debitis, placeat quae neque autem aliquid incidunt! Eum laborum aliquam aperiam?',
                    imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
                    valueLike: 12,
                },
                {
                    id: 2,
                    message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore laboriosam nemo, ' +
                        'beatae consectetur dolores error commodi eaque sapiente placeat in. Esse, recusandae hic!',
                    imgSrc: 'https://i.pinimg.com/564x/3c/e6/25/3ce625ab130460755d1475fb033652f2.jpg',
                    valueLike: 39,
                },
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogsData: [
                {
                    id: 1,
                    name: 'Mark',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJxthr9nDPbKhJIu5DEsJ0uHsPH0WSEDQF7uZo5pDA=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 2,
                    name: 'John',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJzHLJfkjoU61FIkVK5ye1LJgQbIngHPy87DRVgm=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 3,
                    name: 'Maria',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJyR7U5ykD6u7x_aAONJV7DOiGSchVoMXy_xRDqUYg=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 4,
                    name: 'Jain',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJydcQ-trfDU7yDBaCQvHWGwc5S8vKeZbvzAdg=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 5,
                    name: 'Sveta',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJwrMtJcMHGB4FeIjrQUYWd2Pw5u6Pu9BzKpgQ=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 6,
                    name: 'Masha',
                    imageSrc: 'https://yt3.ggpht.com/a/AATXAJxBep478nG6aewuVACbTn618sNqNKiiEEkPSagvVw=s900-c-k-c0xffffffff-no-rj-mo'
                },
                {
                    id: 7,
                    name: 'Lesya',
                    imageSrc: 'https://yt3.ggpht.com/a/AGF-l7-6g_aN-PuejAdg2u9oCU6a1WOqkI7o93OaiA=s900-c-k-c0xffffffff-no-rj-mo'
                },
            ],
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you doing?'},
                {id: 3, message: 'I\'m fine and you?'},
                {id: 4, message: 'Thanks, I\'m too'},
                {id: 5, message: 'What are you doing?'},
            ],
            newMessageText: '',
        },
        sidebar: [
            {
                name: 'Profile',
                url: '/profile'
            },
            {
                name: 'Messages',
                url: '/dialogs'
            },
            {
                name: 'News',
                url: '/news'
            },
            {
                name: 'Videos',
                url: '/videos'
            },
            {
                name: 'Musics',
                url: '/musics'
            },
            {
                name: 'Settings',
                url: '/settings'
            },
        ]
    },
    _callSubscriber() {
        console.log('State chance');
    },

    getState(){
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
}

window.store = store;

export default store;