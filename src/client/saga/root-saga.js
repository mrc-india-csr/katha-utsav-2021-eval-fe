import { fork } from 'redux-saga/effects';
import statusCountSaga from './status-count-saga';

export default function* rootSaga() {
  yield fork(statusCountSaga);
}