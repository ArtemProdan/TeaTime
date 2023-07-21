import React, { useEffect } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import { Navbar } from './components/Navbar/Navbar';
import { Content } from './components/Content';
import { LeftBar } from './components/LeftBar/LeftBar';
// import { RightBar } from './components/RightBar/RightBar';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer.ts';
import { Preloader } from './components/Common/Preloader';
import AuthError from './components/Common/Error/AuthError';

const App = ({ authError, initialized, initializeApp, store }) => {
  useEffect(() => {
    initializeApp();
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
    };
  }, [initializeApp]);

  const catchAllUnhandledErrors = (reason, promise) => {
    alert(reason);
    //console.error(promiseRejectionEvent);
  };

  if (authError && authError.length > 0) {
    return <AuthError />;
  }

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <HeaderContainer />
      <LeftBar />
      <Navbar />
      <Content store={store} />
      {/* <RightBar /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  authError: state.auth.authError,
});

export default connect(mapStateToProps, { initializeApp })(App);
