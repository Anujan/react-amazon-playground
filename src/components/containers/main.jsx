import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-simple-promise';
import * as reducers from '../../reducers/index';
import Router from 'react-router';
import 'normalize.css';
import 'styles/App.css';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware()
)(createStore);

const store = createStoreWithMiddleware(reducer);

const MainContainer = function (props) {
  return {
    props,

    render() {
      return (
        <Provider store={store}>
          <Router.RouteHandler {...this.props} />
        </Provider>
      )
    }
  }
};

export default MainContainer;
