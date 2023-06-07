import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../Preloader';
import AuthError from './AuthError';

const AppCheck = ({ authError, initialized }) => {
  if (authError && authError.length > 0) {
    return <AuthError />;
  }

  if (!initialized) {
    return <Preloader />;
  }

  return null;
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  authError: state.auth.authError,
});

export default connect(mapStateToProps)(AppCheck);
