import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return { authActions: bindActionCreators(AuthActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
