import React from 'react';
import './App.css';
import News from "./components/News/News";
import Videos from "./components/Videos/Videos";
import Musics from "./components/Musics/Musics";
import Settings from "./components/Settings/Settings";
import {HashRouter, Route, Routes} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import Initial from "./components/Initial/Initial";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        console.log(promiseRejectionEvent.reason);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div>
                <HeaderContainer/>
                <div className="container">
                    <div className={"app-wrapper"}>
                        <NavbarContainer/>
                        <div className='app-content'>
                            <Routes >
                                <Route path='/profile/:userId?'
                                       render={() => <ProfileContainer/>}/>
                                <Route path='/dialogs'
                                       render={withSuspense(DialogsContainer)}/>
                                <Route path='/users'
                                       render={withSuspense(UsersContainer)}/>
                                <Route path='/login'
                                       render={withSuspense(LoginPage)}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/videos' render={() => <Videos/>}/>
                                <Route path='/musics' render={() => <Musics/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route exact path='/' render={() => <Initial/>}/>
                                <Route path='*' render={() => <div> 404 NOT FOUND </div>}/>
                            </Routes>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const SocialApp = () => {
    return (
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </HashRouter>
        </React.StrictMode>
    )
}

const AppContainer = compose(
    // withRouter,
    connect(mapStateToProps, {initializeApp}),
)(App);

export default SocialApp;