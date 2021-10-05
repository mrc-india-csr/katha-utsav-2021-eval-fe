import { SET_PENDING_STATUS_COUNT,
  SET_APPROVED_STATUS_COUNT,
  SET_DECLINED_STATUS_COUNT,
  SET_STATUS_COUNT
 } from "./types";

export const getExample =  data => {
  return { type: EXAMPLE, data };
};

export const setPendingStatusCount = data => {
  return { type: SET_PENDING_STATUS_COUNT, data };
}

export const setApprovedStatusCount = data => {
  return { type: SET_APPROVED_STATUS_COUNT, data };
}

export const setDeclinedStatusCount = data => {
  return { type: SET_DECLINED_STATUS_COUNT, data };
}

export const setStatusCount = () => {
  return { type: SET_STATUS_COUNT };
}