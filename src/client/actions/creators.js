import {
  SET_PENDING_STATUS_COUNT,
  SET_APPROVED_STATUS_COUNT,
  SET_DECLINED_STATUS_COUNT,
  GET_STATUS_COUNT,
  UPDATE_TOTAL_COUNT,
  UPDATE_FICTION_COUNT,
  UPDATE_NON_FICTION_COUNT,
  UPDATE_POETRY_COUNT,
  UPDATE_TOTAL_DATA_SET,
  UPDATE_CURRENT_DATA_SET,
  SET_STUDENT_DETAILS,
  GET_STUDENT_DETAILS, 
  SHOW_MODAL, 
  HIDE_MODAL,
  ACCEPT_OR_DECLINE_STORY,
  ASSIGN_STORY,
  UN_ASSIGN_STORY,
  UPDATE_STORY_ASSIGNED,
  UPDATE_STORY_UN_ASSIGNED,
  UPDATE_ACCEPT_OR_DECLINED,
  UPDATE_JURY_EMAIL_ID,
  FILTER_MINE,
  STATUS_FILTER,
  UPDATE_SELECTED_STORY_TYPE,
} from "./types";

export const setPendingStatusCount = data => {
  return { type: SET_PENDING_STATUS_COUNT, data };
}

export const setApprovedStatusCount = data => {
  return { type: SET_APPROVED_STATUS_COUNT, data };
}

export const setDeclinedStatusCount = data => {
  return { type: SET_DECLINED_STATUS_COUNT, data };
}

export const getStatusCount = () => {
  return { type: GET_STATUS_COUNT };
}

export const getStudentDetails = () => {
  return { type: GET_STUDENT_DETAILS };
}

export const updateSelectedStoryType = data => {
  return { type: UPDATE_SELECTED_STORY_TYPE, data };
}

export const setStudentDetails = data => {
  return { type: SET_STUDENT_DETAILS, data };
}

export const updateTotalCount = data => {
  return { type: UPDATE_TOTAL_COUNT, data };
}

export const updateFictionCount = data => {
  return { type: UPDATE_FICTION_COUNT, data };
}

export const updateNonFictionCount = data => {
  return { type: UPDATE_NON_FICTION_COUNT, data };
}

export const updatePoetryCount = data => {
  return { type: UPDATE_POETRY_COUNT, data };
}

export const updateTotalDataSet = data => {
  return { type: UPDATE_TOTAL_DATA_SET, data };
}

export const updateCurrentDataset = data => {
  return { type: UPDATE_CURRENT_DATA_SET, data };
}

export const showModal = data => {
  return {type: SHOW_MODAL, data};
}

export const hideModal = data => {
  return {type: HIDE_MODAL, data};
}

export const acceptOrDeclineStory = data => {
  return {type: ACCEPT_OR_DECLINE_STORY, data};
}

export const assignStory = data => {
  return {type: ASSIGN_STORY, data};
}

export const unAssignStory = data => {
  return {type: UN_ASSIGN_STORY, data};
}

export const updateStoryAssigned = data => {
  return {type: UPDATE_STORY_ASSIGNED, data};
}

export const updateStoryUnAssigned = data => {
  return {type: UPDATE_STORY_UN_ASSIGNED, data};
}

export const updateAcceptOrDeclined = data => {
  return {type: UPDATE_ACCEPT_OR_DECLINED, data};
}

export const updateJuryEmailId = data => {
  return {type: UPDATE_JURY_EMAIL_ID, data};
}

export const filterMine = data => {
  return {type: FILTER_MINE, data};
}
export const statusFilter = data => {
  return {type: STATUS_FILTER, data};
}