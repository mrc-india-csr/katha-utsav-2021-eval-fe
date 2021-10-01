import React from 'react'
import {hydrate} from 'react-dom'
import Dashboard from "../../pages/dashboard";
import {compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../client/reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
    
const enhancer = composeEnhancers();

const store = createStore(rootReducer,enhancer);


hydrate(
  <Provider store={store}>
    <Dashboard />
  </Provider>
  , document.getElementById('root')
);

