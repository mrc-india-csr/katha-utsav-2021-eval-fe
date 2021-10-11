import { 
  SET_PENDING_STATUS_COUNT, 
  SET_APPROVED_STATUS_COUNT, 
  SET_DECLINED_STATUS_COUNT,
  UPDATE_JURY_EMAIL_ID } from "../actions/types";

const initialState = {
  pendingStatusCount: 0,
  approvedStatusCount: 0,
  declinedStatusCount: 0,
  juryEmailId: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_PENDING_STATUS_COUNT: {
      const newState = {
        ...state,
        pendingStatusCount: action.data
      }
      return newState;
    }

    case SET_APPROVED_STATUS_COUNT: {
      const newState = {
        ...state,
        approvedStatusCount: action.data
      }
      return newState;
    }
    
    case SET_DECLINED_STATUS_COUNT: {
      const newState = {
        ...state,
        declinedStatusCount: action.data
      }
      return newState;
    }

    case UPDATE_JURY_EMAIL_ID: {
      const newState = {
        ...state,
        juryEmailId: action.data
      }
      return newState;
    }

    default:
      return state;
  }
}