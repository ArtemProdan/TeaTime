const ADD_MESSAGE = 'ADD-MESSAGE';

let initialSate = {
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
}

const dialogsReducer = (state = initialSate, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messagesData: [ ...state.messagesData, {id: 5, message: action.newMessage}],
            };

        default:
            return state;
    }
}


export const addMessageActionCreator = (newMessage) => ({type: ADD_MESSAGE, newMessage: newMessage});

export default dialogsReducer;