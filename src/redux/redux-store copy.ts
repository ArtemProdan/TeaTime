import { applyMiddleware, combineReducers, legacy_createStore,  compose } from "redux";
// import { reducer as formReducer } from 'redux-form'

import postsReducer from "./posts-reducer";
import dialogsReducer from "./dialogs-reducer";
import profilesReducer from './profiles-reducer'
import galleryReducer from "./gallery-reducer";
import authReducer from './auth-reducer'
import thunkMiddleware  from "redux-thunk";
import appReducer from './app-reducer'


let rootReducer = combineReducers({
    postsData : postsReducer, 
    messagesData : dialogsReducer,
    profilesData : profilesReducer,
    cardList: galleryReducer,
    auth : authReducer,
    // form: formReducer,
    app : appReducer,
})

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = legacy_createStore (rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.store = store;

export default store