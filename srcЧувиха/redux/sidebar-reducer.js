const TOGGLE_BURGER_MENU = 'sidebar/TOGGLE_BURGER_MENU';

let initialState = {
    sidebar:[
        {
            id: 0,
            name: 'Profile',
            url: '/profile'
        },
        {
            id: 1,
            name: 'Users',
            url: '/users'
        },
        {
            id: 2,
            name: 'Messages',
            url: '/dialogs'
        },
        {
            id: 3,
            name: 'News',
            url: '/news'
        },
        {
            id: 4,
            name: 'Videos',
            url: '/videos'
        },
        {
            id: 5,
            name: 'Musics',
            url: '/musics'
        },
        {
            id: 6,
            name: 'Settings',
            url: '/settings'
        },
],
    burgerEditMode: false,
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_BURGER_MENU: {
            return {
                ...state,
                burgerEditMode: action.isToggle,
            }
        }

        default: return state
    }
}

export const setToggleBurgerMenuAC = (isToggle) => ({type: TOGGLE_BURGER_MENU, isToggle: isToggle});

export default sidebarReducer;