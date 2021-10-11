import { takeEvery, put, call } from "@redux-saga/core/effects";
import { makeApiCall } from "../../utils/helpers/apiCallHelpers";
import { setApprovedStatusCount, setDeclinedStatusCount, setPendingStatusCount, updateJuryEmailId } from "../actions/creators";
import { GET_STATUS_COUNT } from "../actions/types";

export const setStatusCountInStore = function* () {
  try {
    const { data } = yield call(makeApiCall, {
      method: 'get',
      url: '/api/statusCount',
    });
    yield put(setPendingStatusCount(parseInt(data.pendingStatus)));
    yield put(setApprovedStatusCount(parseInt(data.approvedStatus)));
    yield put(setDeclinedStatusCount(parseInt(data.declinedStatus)));
    yield put(updateJuryEmailId(data.userData.email));
  }
  catch (error) {
    console.log(error);
  }
}


export default function* statusCountSaga() {
  yield takeEvery(GET_STATUS_COUNT, setStatusCountInStore);
}