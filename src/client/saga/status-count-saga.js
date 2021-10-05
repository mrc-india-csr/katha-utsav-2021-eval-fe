import { takeEvery, takeMaybe, put, call } from "@redux-saga/core/effects";
import { makeApiCall } from "../../utils/helpers/apiCallHelpers";
import { setApprovedStatusCount, setDeclinedStatusCount, setPendingStatusCount } from "../actions/creators";
import { SET_STATUS_COUNT } from "../actions/types";

export const setStatusCountInStore = function* () {
  try {
    const { data } = yield call(makeApiCall, {
      method: 'get',
      url: '/statusCount',
    });
    yield put(setPendingStatusCount(data.pendingStatus));
    yield put(setApprovedStatusCount(data.approvedStatus));
    yield put(setDeclinedStatusCount(data.declinedStatus));
  }
  catch (error) {
    console.log(error);
  }
}


export default function* statusCountSaga() {
  yield takeEvery(SET_STATUS_COUNT, setStatusCountInStore);
}