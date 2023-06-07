import { applyMiddleware, combineReducers, legacy_createStore,  compose } from "redux";
// import { reducer as formReducer } from 'redux-form'

import postsReducer from "./posts-reducer";
import dialogsReducer from "./dialogs-reducer";
import profilesReducer from './profiles-reducer'
import galleryReducer from "./gallery-reducer";
import authReducer from './auth-reducer'
import thunkMiddleware  from "redux-thunk";
import appReducer from './app-reducer'

let reducers = combineReducers({
    postsData : postsReducer, 
    messagesData : dialogsReducer,
    profilesData : profilesReducer,
    cardList: galleryReducer,
    auth : authReducer,
    // form: formReducer,
    app : appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = legacy_createStore (reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store