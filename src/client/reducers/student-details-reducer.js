import { SET_STUDENT_DETAILS, 
  UPDATE_TOTAL_COUNT, 
  UPDATE_FICTION_COUNT, 
  UPDATE_NON_FICTION_COUNT, 
  UPDATE_POETRY_COUNT,
  UPDATE_CURRENT_DATA_SET,
  UPDATE_TOTAL_DATA_SET,
  UPDATE_STORY_ASSIGNED,
  UPDATE_ACCEPT_OR_DECLINED,
  UPDATE_STORY_UN_ASSIGNED,
  FILTER_MINE,
  STATUS_FILTER,
  UPDATE_SELECTED_STORY_TYPE
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

    case FILTER_MINE : {
      const newState = {
        ...state,
        assignedOnly: action.data
      }
      return newState;
    }

    case STATUS_FILTER : {
      const newState = {
        ...state,
        statusFilter: action.data
      }
      return newState;
    }
    
    case UPDATE_SELECTED_STORY_TYPE: {
      const newState = {
        ...state,
        storyFilter: action.data
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

    case UPDATE_STORY_ASSIGNED: {
      const newStudentsList = state.studentsList;
      const { studentIndex } = action.data;
      const { jury_email_id, jury_name, evaluation_status, evaluation_id } = action.data.juryDetails;

     newStudentsList[studentIndex] = {
        ...newStudentsList[studentIndex],
        jury_email_id,
        jury_name,
        evaluation_status,
        evaluation_id
     };
     
      const newState = {
        ...state,
        studentsList: [...newStudentsList]
      }
      return newState;
    }

    case UPDATE_STORY_UN_ASSIGNED: {
      const newStudentsList = state.studentsList;
      const studentIndex = action.data;
     newStudentsList[studentIndex] = {
        ...newStudentsList[studentIndex],
        jury_email_id: null,
        jury_name: null,
        evaluation_status: null,
        evaluation_id: null
     };
     
      const newState = {
        ...state,
        studentsList: [...newStudentsList]
      }
      return newState;
    }

    case UPDATE_ACCEPT_OR_DECLINED: {
      const newStudentsList = state.studentsList.filter((element, index) => index !== action.data);
      const newState = {
        ...state,
        studentsList: [...newStudentsList]
      }
      return newState;
    }

    default:
      return state;
  }  
}