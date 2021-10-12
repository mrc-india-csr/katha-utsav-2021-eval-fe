import { GET_STUDENT_DETAILS, ACCEPT_OR_DECLINE_STORY, ASSIGN_STORY, UN_ASSIGN_STORY } from '../actions/types';
import { setStudentDetails, updateTotalCount, updateFictionCount, updateNonFictionCount, updatePoetryCount, updateTotalDataSet, updateCurrentDataset, updateStoryAssigned, updateAcceptOrDeclined, setPendingStatusCount, setApprovedStatusCount, setDeclinedStatusCount, updateStoryUnAssigned} from '../actions/creators';
import { makeApiCall } from "../../utils/helpers/apiCallHelpers";
import { takeEvery, call, put, select } from '@redux-saga/core/effects';

export const updateStudentDetails = function*() {
  try {
    const {dataSet, assignedOnly, storyFilter, statusFilter} = yield select(state => state.studentDetails);
    let params = {dataSet, assignedOnly, storyFilter, statusFilter};
    const { data } = yield call(makeApiCall, {
      method: 'post',
      url: '/api/student_details',
      data: params
    });
    yield put(setStudentDetails(data.studentsList));
    yield put(updateTotalCount(parseInt(data.fictionCount)+parseInt(data.nonFictionCount)+parseInt(data.poetryCount)));
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

const acceptOrDeclineStoryCall = function*(action) {
  try {
    const response = yield call(makeApiCall, {
      method: 'patch',
      url: `api/student_details/action/${action.data.id}/${action.data.storyAction}`,
      data: {}
    });
    console.log(response, action.data);
    const { pendingStatusCount, approvedStatusCount, declinedStatusCount } = yield select(state => state.statusCount);
    const { totalCount, fictionCount, nonFictionCount, poetryCount } = yield select(state => state.studentDetails);
    
    yield put(updateAcceptOrDeclined(action.data.studentIndex));
    yield put(setPendingStatusCount(pendingStatusCount-1));
    yield put(updateTotalCount(totalCount-1));
    
    if(action.data.storyAction === 1) {
      yield put(setApprovedStatusCount(approvedStatusCount+1));
    }
    else {
      yield put(setDeclinedStatusCount(declinedStatusCount+1));
    }

    switch(action.data.storyCategory) {
      case 'Fiction': {
        yield put(updateFictionCount(fictionCount-1));
        break;
      }
      case 'NonFiction': {
        yield put(updateNonFictionCount(nonFictionCount-1));
        break;
      }
      case 'Poetry': {
        yield put(updatePoetryCount(poetryCount-1));
        break;
      }
      default:
        return;
    }
  }
  catch (error) {
    console.log(error);
  }
}

const assignStoryCall = function*(action) {
  try {
    const { data } = yield call(makeApiCall, {
      method: 'post',
      url: `api/student_details/assign/${action.data.id}`,
      data: {}
    });
    yield put(updateStoryAssigned({studentIndex: action.data.studentIndex, juryDetails: data}));
  }
  catch( error ) {
    console.log(error);
  }
}

const unAssignStoryCall = function*(action) {
  try {
    const { data } = yield call(makeApiCall, {
      method: 'patch',
      url: `api/student_details/unassign/${action.data.id}`,
      data: {}
    });
    yield put(updateStoryUnAssigned(action.data.studentIndex));
  }
  catch( error ) {
    console.log(error);
  }
}

export default function* studentDetailsSaga() {
  yield takeEvery(GET_STUDENT_DETAILS, updateStudentDetails);
  yield takeEvery(ACCEPT_OR_DECLINE_STORY, acceptOrDeclineStoryCall);
  yield takeEvery(ASSIGN_STORY, assignStoryCall);
  yield takeEvery(UN_ASSIGN_STORY, unAssignStoryCall);
}