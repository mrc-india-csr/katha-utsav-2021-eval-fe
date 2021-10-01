import { combineReducers } from 'redux';
import example from './example-reducer';

export const rootReducerObject = {
    example
};

export const rootReducer = combineReducers(rootReducerObject);