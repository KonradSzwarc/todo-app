import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeEvery } from 'redux-saga/effects';

import { findAllTasksRequest, FindAllTasksResponse } from '@/api/task/findAllTasks';
import { UpdateTaskBody, UpdateTaskParams, updateTaskRequest, UpdateTaskResponse } from '@/api/task/updateTask';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import { Task } from '@/models/Task';
import { RootState } from '@/typings/redux';
import { equals } from '@/utils/equals';

import { WorkerAction } from './types';
import { createAsyncState } from './utils';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: createAsyncState<Task[]>([]),
  reducers: {
    fetchTasksRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.status = 'success';
      state.data = action.payload;
      state.error = null;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
    updateTaskRequest: (state, _action: PayloadAction<{ params: UpdateTaskParams; body: UpdateTaskBody }>) => {
      state.status = 'loading';
      state.error = null;
    },
    updateTaskOptimistic: (state, action: PayloadAction<Task>) => {
      state.status = 'success';
      state.data = state.data.map((task) => (task.id === action.payload.id ? action.payload : task));
      state.error = null;
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
  },
});

const { actions } = tasksSlice;

export const tasksSelector = (state: RootState) => state.tasks;

function* fetchTasksSagaWorker() {
  try {
    const response: FindAllTasksResponse = yield findAllTasksRequest();
    yield put(actions.fetchTasksSuccess(response.data));
  } catch (ex) {
    yield put(actions.fetchTasksFailure(ex.message));
  }
}

function* updateTaskSagaWorker({ payload: { params, body } }: WorkerAction<typeof actions.updateTaskRequest>) {
  const tasks: RootState['tasks'] = yield select(tasksSelector);
  const currentTask = tasks.data.find(({ id }) => id === params.id);

  if (currentTask) {
    const newTask = { ...currentTask, ...body };

    yield put(actions.updateTaskOptimistic(newTask));

    try {
      const response: UpdateTaskResponse = yield updateTaskRequest(params, body);

      if (!equals(newTask, response.data)) {
        console.error('Optimistic update returns different value than the request');
        yield put(actions.updateTaskOptimistic(response.data));
      }
    } catch (ex) {
      yield put(actions.updateTaskFailure(ex.message));
      yield put(actions.updateTaskOptimistic(currentTask));
    }
  }
}

export function* tasksSagaWatcher() {
  yield takeEvery(actions.fetchTasksRequest.type, fetchTasksSagaWorker);
  yield takeEvery(actions.updateTaskRequest.type, updateTaskSagaWorker);
}

export const useTasksActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ fetchTasks: actions.fetchTasksRequest, updateTask: actions.updateTaskRequest }, dispatch);
};

export const useTasksState = () => useSelector(tasksSelector);

export default tasksSlice.reducer;
