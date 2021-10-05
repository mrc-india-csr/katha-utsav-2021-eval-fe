import { 
  SET_PENDING_STATUS_COUNT, 
  SET_APPROVED_STATUS_COUNT, 
  SET_DECLINED_STATUS_COUNT } from "../actions/types";

const initialState = {
  pendingStatusCount: '',
  approvedStatusCount: '',
  declinedStatusCount: '',
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

    default:
      return initialState;
  }
}