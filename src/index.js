import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import store from './redux/redux-store';
// import StoreContext from './StoreContext2';
import { Provider } from 'react-redux';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

// let rerenderEntireTree = () => {

    root.render(
            // <BrowserRouter basename={process.env.PUBLIC_URL}>
            <HashRouter>
                <Provider store={store}>
                    <App store={store} />
                </Provider>
            </HashRouter>
    )
// }
// rerenderEntireTree(store.getState())

// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state)
// })
