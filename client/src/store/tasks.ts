import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeEvery } from 'redux-saga/effects';
import * as uuid from 'uuid';

import { createTaskRequest, CreateTaskResponse } from '@/api/task/createTask';
import { deleteTaskRequest } from '@/api/task/deleteTask';
import { findAllTasksRequest, FindAllTasksResponse } from '@/api/task/findAllTasks';
import { UpdateTaskBody, UpdateTaskParams, updateTaskRequest, UpdateTaskResponse } from '@/api/task/updateTask';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import { Task } from '@/models/Task';
import { RootState } from '@/typings/redux';

import { currentUserSelector } from './currentUser';
import { WorkerAction } from './types';
import { createAsyncState, matchOptimistic } from './utils';

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
    createTaskRequest: (state, _action: PayloadAction<string>) => {
      state.status = 'loading';
      state.error = null;
    },
    createTaskOptimistic: (state, action: PayloadAction<Task>) => {
      state.status = 'success';
      state.data.push(action.payload);
      state.error = null;
    },
    createTaskSuccess: (state, action: PayloadAction<{ temporaryId: string; task: Task }>) => {
      state.status = 'success';
      state.data = state.data.map((task) => (task.id === action.payload.temporaryId ? action.payload.task : task));
      state.error = null;
    },
    createTaskFailure: (state, { payload }: PayloadAction<{ message: string; temporaryTask: Task }>) => {
      state.status = 'failure';
      state.data = state.data.filter((task) => task.id !== payload.temporaryTask.id);
      state.error = payload.message;
    },
    updateTaskRequest: (state, _action: PayloadAction<{ params: UpdateTaskParams; body: UpdateTaskBody }>) => {
      state.status = 'loading';
      state.error = null;
    },
    updateTaskOptimistic: (state, { payload }: PayloadAction<Task>) => {
      state.status = 'success';
      state.data = state.data.map((task) => (task.id === payload.id ? payload : task));
      state.error = null;
    },
    updateTaskSuccess: (state, { payload }: PayloadAction<Task | undefined>) => {
      if (payload) {
        state.data = state.data.map((task) => (task.id === payload.id ? payload : task));
      }
    },
    updateTaskFailure: (state, { payload }: PayloadAction<{ message: string; optimisticTask: Task }>) => {
      state.status = 'failure';
      state.data = state.data.map((task) => (task.id === payload.optimisticTask.id ? payload.optimisticTask : task));
      state.error = payload.message;
    },
    deleteTaskRequest: (state, _action: PayloadAction<string>) => {
      state.status = 'loading';
      state.error = null;
    },
    deleteTaskOptimistic: (state, { payload }: PayloadAction<string>) => {
      state.status = 'success';
      state.data = state.data.filter((task) => task.id !== payload);
      state.error = null;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deleteTaskSuccess: () => {},
    deleteTaskFailure: (state, { payload }: PayloadAction<{ message: string; tasksSnapshot: Task[] }>) => {
      state.status = 'failure';
      state.data = payload.tasksSnapshot;
      state.error = payload.message;
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

function* createTaskSagaWorker({ payload }: WorkerAction<typeof actions.createTaskRequest>) {
  const user: RootState['currentUser'] = yield select(currentUserSelector);

  if (user.data) {
    const newTask: Task = { id: uuid.v4(), title: payload, isDone: false, userId: user.data.id };

    yield put(actions.createTaskOptimistic(newTask));

    try {
      const response: CreateTaskResponse = yield createTaskRequest({ title: payload });
      yield put(actions.createTaskSuccess({ temporaryId: newTask.id, task: response.data }));
    } catch (ex) {
      yield put(actions.createTaskFailure({ message: ex.message, temporaryTask: newTask }));
    }
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
      const isEqualToOptimistic = matchOptimistic(newTask, response.data);

      yield put(actions.updateTaskSuccess(isEqualToOptimistic ? undefined : response.data));
    } catch (ex) {
      yield put(actions.updateTaskFailure({ message: ex.message, optimisticTask: newTask }));
    }
  }
}

function* deleteTaskSagaWorker({ payload }: WorkerAction<typeof actions.deleteTaskRequest>) {
  const tasks: RootState['tasks'] = yield select(tasksSelector);

  yield put(actions.deleteTaskOptimistic(payload));

  try {
    yield deleteTaskRequest({ id: payload });
    yield put(actions.deleteTaskSuccess());
  } catch (ex) {
    yield put(actions.deleteTaskFailure({ message: ex.message, tasksSnapshot: tasks.data }));
  }
}

export function* tasksSagaWatcher() {
  yield takeEvery(actions.fetchTasksRequest.type, fetchTasksSagaWorker);
  yield takeEvery(actions.createTaskRequest.type, createTaskSagaWorker);
  yield takeEvery(actions.updateTaskRequest.type, updateTaskSagaWorker);
  yield takeEvery(actions.deleteTaskRequest.type, deleteTaskSagaWorker);
}

export const useTasksActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      fetchTasks: actions.fetchTasksRequest,
      createTask: actions.createTaskRequest,
      updateTask: actions.updateTaskRequest,
      deleteTask: actions.deleteTaskRequest,
    },
    dispatch,
  );
};

export const useTasksState = () => useSelector(tasksSelector);

export default tasksSlice.reducer;
