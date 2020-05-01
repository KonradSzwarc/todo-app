import { all } from 'redux-saga/effects';
import { currentUserSagaWatcher } from './currentUser';

export function* rootSaga() {
  yield all([currentUserSagaWatcher()]);
}
