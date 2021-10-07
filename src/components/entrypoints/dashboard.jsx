import React from 'react'
import {hydrate} from 'react-dom'
import Dashboard from "../../pages/dashboard";
import {compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../client/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../client/saga/root-saga';
import { GET_STUDENT_DETAILS, GET_STATUS_COUNT } from '../../client/actions/types';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
    
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer,composeEnhancers(middleware));
sagaMiddleware.run(rootSaga);
window.onload = () => {
  store.dispatch({type: GET_STATUS_COUNT});
  store.dispatch({type: GET_STUDENT_DETAILS});
}

hydrate(
  <Provider store={store}>
    <Dashboard />
  </Provider>
  , document.getElementById('root')
);

