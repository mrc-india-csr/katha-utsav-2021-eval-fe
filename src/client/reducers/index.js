import { combineReducers } from 'redux';
import statusCount from './status-count-reducer';
import studentDetails from './student-details-reducer';
import displayModalReducer from './display-modal-reducer';
export const rootReducerObject = {
    statusCount,
    studentDetails,
    displayModalReducer
};

export const rootReducer = combineReducers(rootReducerObject);