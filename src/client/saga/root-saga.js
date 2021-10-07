import { all, call, fork } from 'redux-saga/effects';
import statusCountSaga from './status-count-saga';
import studentDetailsSaga from './student-details-saga';

export default function* rootSaga() {
  yield all([
    call(studentDetailsSaga),
    call(statusCountSaga)
  ]);
}