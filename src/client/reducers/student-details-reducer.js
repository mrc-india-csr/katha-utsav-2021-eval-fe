import { SET_STUDENT_DETAILS, 
  UPDATE_TOTAL_COUNT, 
  UPDATE_FICTION_COUNT, 
  UPDATE_NON_FICTION_COUNT, 
  UPDATE_POETRY_COUNT,
  UPDATE_CURRENT_DATA_SET,
  UPDATE_TOTAL_DATA_SET
 } from "../actions/types";

const initialState = {
  dataSet: 1,
  assignedOnly: false,
  storyFilter: 'All',
  limit: 10,
  statusFilter: 'PENDING',
  totalCount: '5',
  currentPage: 1,
  totalPages: 1,
  prevEnabled: false,
  nextEnabled: false,
  totalCount: 0,
  fictionCount: 0,
  NonFictionCount: 0,
  poetryCount: 0,
  currentDataSet: 1,
  totalDataSet: 1,
  studentsList: [],
};

export default function(state= initialState, action) {
  switch(action.type){
    case SET_STUDENT_DETAILS : {
      const newState = {
        ...state, 
        studentsList: action.data
      }
      return newState;
    }

    case UPDATE_TOTAL_COUNT : {
      const newState = {
        ...state, 
        totalCount: action.data
      }
      return newState;
    }

    case UPDATE_FICTION_COUNT : {
      const newState = {
        ...state, 
        fictionCount: action.data
      }
      return newState;
    }

    case UPDATE_NON_FICTION_COUNT : {
      const newState = {
        ...state, 
        NonFictionCount: action.data
      }
      return newState;
    }

    case UPDATE_POETRY_COUNT : {
      const newState = {
        ...state, 
        poetryCount: action.data
      }
      return newState;
    }

    case UPDATE_TOTAL_DATA_SET : {
      const newState = {
        ...state, 
        totalDataSet: action.data
      }
      return newState;
    }

    case UPDATE_CURRENT_DATA_SET : {
      const newState = {
        ...state, 
        currentDataSet: action.data
      }
      
      return newState;
    }

    default:
      return state;
  }  
}