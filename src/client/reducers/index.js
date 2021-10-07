import { combineReducers } from 'redux';
import statusCount from './status-count-reducer';
import studentDetails from './student-details-reducer';

export const rootReducerObject = {
    statusCount,
    studentDetails
};

export const rootReducer = combineReducers(rootReducerObject);