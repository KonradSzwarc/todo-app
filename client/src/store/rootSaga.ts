import { all } from 'redux-saga/effects';

import { currentUserSagaWatcher } from './currentUser';
import { tasksSagaWatcher } from './tasks';

export function* rootSaga() {
  yield all([currentUserSagaWatcher(), tasksSagaWatcher()]);
}
