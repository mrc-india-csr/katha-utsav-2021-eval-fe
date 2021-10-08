import {HIDE_MODAL, SHOW_MODAL} from "../actions/types";

const initialState = {
  showModal: false,
  displayName: '',
  evaluationAction: '',
  evaluationId: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        displayName: action.data.displayName,
        evaluationAction: action.data.evaluationAction,
        evaluationId: action.data.evaluationId,
      }
    case HIDE_MODAL:
      return {
        showModal: false,
        displayName: '',
        evaluationAction: '',
        evaluationId: ''
      }
    default:
      return initialState;
  }
}