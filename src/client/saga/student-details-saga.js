import { GET_STUDENT_DETAILS } from '../actions/types';
import { setStudentDetails, updateTotalCount, updateFictionCount, updateNonFictionCount, updatePoetryCount, updateTotalDataSet, updateCurrentDataset} from '../actions/creators';
import { makeApiCall } from "../../utils/helpers/apiCallHelpers";
import { takeEvery, call, put } from '@redux-saga/core/effects';

const params = {
  dataSet: 1,
  assignedOnly: false,
  storyFilter: "All",
  statusFilter: "PENDING",
}

export const updateStudentDetails = function*() {
  try {
    const { data } = yield call(makeApiCall, {
      method: 'post',
      url: '/api/student_details',
      data: params
    });
    yield put(setStudentDetails(data.studentsList));
    yield put(updateTotalCount(data.totalCount));
    yield put(updateFictionCount(data.fictionCount));
    yield put(updateNonFictionCount(data.nonFictionCount));
    yield put(updatePoetryCount(data.poetryCount));
    yield put(updateTotalDataSet(data.totalDataSet));
    yield put(updateCurrentDataset(data.currentDataSet));
  }
  catch(error) {
    console.log(error);
  }
}

export default function* studentDetailsSaga() {
  yield takeEvery(GET_STUDENT_DETAILS, updateStudentDetails);
}