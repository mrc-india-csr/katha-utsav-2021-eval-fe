import { SET_PENDING_STATUS_COUNT,
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
  GET_STUDENT_DETAILS
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