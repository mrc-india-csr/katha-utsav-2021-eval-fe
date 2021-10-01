import { EXAMPLE } from "../actions/types";

const initialState = {
  example: '***************************'
}

export default function(state = initialState, action) {
  switch(action.type) {
    case EXAMPLE: {
      const newState = {
        ...state,
        example: action.data
      }
      return newState;
    }

    default:
      return initialState;
  }
}