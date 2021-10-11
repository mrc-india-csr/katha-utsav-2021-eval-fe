import {HIDE_MODAL, SHOW_MODAL} from "../actions/types";

const initialState = {
  showModal: false,
  displayName: '',
  evaluationAction: '',
  evaluationParams: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        displayName: action.data.displayName,
        evaluationParams: action.data.evaluationParams,
      }
    case HIDE_MODAL:
      return {
        showModal: false,
        displayName: '',
        evaluationParams: '',
      }
    default:
      return initialState;
  }
}