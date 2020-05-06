import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import {
  queryCurrentUserRequest,
  QueryCurrentUserResponse,
  SignInBody,
  signInRequest,
  signOutRequest,
  User,
} from '@generated/api';

import { useSelector } from '@hooks/useSelector';
import { createAsyncState, useDispatcher } from './utils';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: createAsyncState<User | null>(null),
  reducers: {
    fetchCurrentUserRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.status = 'success';
      state.data = action.payload;
      state.error = null;
    },
    fetchCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
    signInRequest: (state, _action: PayloadAction<SignInBody>) => {
      state.status = 'loading';
      state.error = null;
    },
    signInSuccess: (state) => state,
    signInFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
    signOutRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.status = 'success';
      state.data = null;
      state.error = null;
    },
    signOutFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
  },
});

const { actions } = currentUserSlice;

function* fetchCurrentUserSagaWorker() {
  try {
    const response: QueryCurrentUserResponse = yield queryCurrentUserRequest();
    yield put(actions.fetchCurrentUserSuccess(response.data));
  } catch (ex) {
    yield put(actions.fetchCurrentUserFailure(ex.message));
  }
}

function* signInSagaWorker({ payload }: PayloadAction<SignInBody>) {
  try {
    yield signInRequest(payload);
    yield put(actions.signInSuccess());
    yield put(actions.fetchCurrentUserRequest());
  } catch (ex) {
    yield put(actions.signInFailure(ex.message));
  }
}

function* signOutSagaWorker() {
  try {
    yield signOutRequest();
    yield put(actions.signOutSuccess());
  } catch (ex) {
    yield put(actions.signOutFailure(ex.message));
  }
}

export function* currentUserSagaWatcher() {
  yield takeEvery(actions.fetchCurrentUserRequest.type, fetchCurrentUserSagaWorker);
  yield takeEvery(actions.signInRequest.type, signInSagaWorker);
  yield takeEvery(actions.signOutRequest.type, signOutSagaWorker);
}

export const useCurrentUserActions = () => {
  const dispatcher = useDispatcher();

  return {
    fetchCurrentUser: dispatcher(actions.fetchCurrentUserRequest),
    signIn: dispatcher(actions.signInRequest),
    signOut: dispatcher(actions.signOutRequest),
  };
};

export const useCurrentUserState = () => useSelector((state) => state.currentUser);

export default currentUserSlice.reducer;
