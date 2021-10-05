import { combineReducers } from 'redux';
import statusCount from './status-count-reducer';

export const rootReducerObject = {
    statusCount
};

export const rootReducer = combineReducers(rootReducerObject);